import { IComponent, IDirective } from '../types/common';
import events from './events';
import { Router } from './router/router';
import { Routes } from './router/routes';
import { DomOp } from './dom-operations';
import { IBaseComponent } from '../components/base.component';
import { LifeCycle } from '../components/lifecycle.enum';
import { IExpander } from './expander/iexpander';
import { BootstrapProp } from './bootstrapprop';
import { IBaseDirective } from './basedirective';
import * as smartComponents from '../components/smart';
import { Events_Symbol_Eventlist, Extends_Symbol, CustomElement_Symbol_Selector } from '../consts/decorator.props';

/**
 * Main support class that provides all global functions. You must call at least the {@link bootstrap} method to register components.
 */
export class GlobalProvider {

  public static registeredElements: Array<string> = [];
  public static registeredDirectives: Map<string, IDirective> = new Map();
  private static tagExpander: Map<string, IExpander> = new Map();
  private static bootstrapProps: BootstrapProp;
  private static router: Router = Router.getInstance();

  /**
   *
   * @param type Called to register a component. The component must have either the decorator {@link CustomElement} or
   * provide the tag name in a property calles *selector*. The component must inherit {@link Component}.
   */
  static register(type: IComponent) {
    if (type[Extends_Symbol]) {
      customElements.define(type[CustomElement_Symbol_Selector], type, { extends: type[Extends_Symbol] });
    } else {
      customElements.define(type[CustomElement_Symbol_Selector], type);
    }
    GlobalProvider.registeredElements.push(type[CustomElement_Symbol_Selector].toUpperCase());
    if (type[Events_Symbol_Eventlist]) {
      type[Events_Symbol_Eventlist].forEach(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
    }
  }

  /**
   * The global configuration. This call is required.
   * @param props Provide module properties with registration and settings.
   */
  public static bootstrap(props: BootstrapProp) {
    GlobalProvider.bootstrapProps = props;
    // wait for document ready before doing anything useful
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      // is already ready
      GlobalProvider.registerInternal();
    } else {
      // otherwise attach event
      document.addEventListener('DOMContentLoaded', _ => {
        GlobalProvider.registerInternal();
      });
    }
  }

  /** @ignore */
  private static registerInternal() {
    // register smart components
    customElements.define('n-outlet', smartComponents.NOutletComponent);
    customElements.define('n-finish', smartComponents.NFinishComponent);
    // register custom components
    GlobalProvider.bootstrapProps.components.forEach(c => {
      // add to browsers web component registry
      GlobalProvider.register(c);
    });
    // expanders
    if (GlobalProvider.bootstrapProps.expanders) {
      // expand and execute decorator
      const expanders = GlobalProvider.bootstrapProps.expanders.map(e => new e());
      expanders.forEach(ex => {
        if (!ex['__expand__']) {
          console.error('Illegal expander, you must set the @Expand decorator to name the expander');
        } else {
          GlobalProvider.tagExpander.set(ex['__expand__'], ex);
        }
      });
    }
    if (GlobalProvider.bootstrapProps.directives) {
      GlobalProvider.bootstrapProps.directives.forEach((bd: IBaseDirective) => {
        GlobalProvider.registeredDirectives.set(bd[Symbol.for('DirectiveSelector')], bd as unknown as IDirective);
      });
    }
    // register events
    events.map(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));

    // that's not enough, we need to wait for all components' async render process
    const customComponents: Promise<void>[] = [];
    // loop through all alread statically set components
    GlobalProvider.bootstrapProps.components.forEach(c => {
      // get all appearances
      [].slice.call(document.getElementsByTagName(c[CustomElement_Symbol_Selector])).forEach((e: IBaseComponent) => {
        // make a promise to wait for the async renderer
        const p = new Promise<void>((resolve) => {
          // if already done it's okay for us (mostly, that's just the main component)
          if (e.isInitalized) {
            resolve();
          } else {
            // all others are being registered and we wait
            e.addEventListener('lifecycle', (lc: CustomEvent) => {
              if (lc.detail === LifeCycle.Load) {
                resolve();
              }
            });
          }
        });
        customComponents.push(p);
      });
    });
    Promise.all(customComponents).then(() => {
      // prepare route, we can't route if the component is not ready yet
      if (GlobalProvider.bootstrapProps.routes) {
        GlobalProvider.router.registerRouter(GlobalProvider.bootstrapProps.routes);
      }
    });
  }

  /**
   * Fires actions if the router navigates. (`navigate` before the event and `navigated` after).
   */
  public static get routerAction() {
    return GlobalProvider.router.onRouterAction;
  }

  /**
   * Programmatically access the router.
   */
  public static navigateRoute(targetRoute: string, outletName?: string): void {
    GlobalProvider.router.navigateRoute(targetRoute, outletName);
  }

  /**
   * Returns the current router configuration. Allows dynamic manipulation.
   */
  public static get routerConfig(): Routes {
    return GlobalProvider.bootstrapProps.routes;
  }

  /**
   * All events are handled by this helper function. This function shall not be called from user code.
   */
  private static async eventHub(e: Event) {
    const parentWalk = (el: HTMLElement, evt: string): any  => {
      if (!el.parentElement) {
        return null;
      }
      // only events attached to custom components matter here
      if (GlobalProvider.registeredElements.some(te => (<HTMLElement>el.parentElement).tagName === te)) {
        const target = el.parentElement[evt];
        if (target) {
          return el.parentElement;
        }
      }
      return parentWalk(el.parentElement, evt);
    };
    if ((<HTMLElement>e.target).getAttribute) {
      let type = e.type;
      if (e instanceof CustomEvent) {
        const className = e.target.constructor.name;
        type = e.type.replace('_' + className, '');
      }
      const target = DomOp.getParent((<HTMLElement>e.target), `[n-on-${type}]`);
      if (target) {
        let call = false;
        const asy = !!(<HTMLElement>e.target).getAttribute(`n-async`);
        let evt = target.getAttribute(`n-on-${type}`);
        if (!evt) {
          // no event target, just ignore
          return;
        }
        const params = [];
        // we're looking for the handler up in the tree
        let parent = target;
        if (parent[evt]) {
          // direkt call on same component
          call = true;
        } else {
          // could be an expression
          const match = evt.match(/^(?:(\(?.+\)?|.?)\s?=>\s?)?.+\.([^(]*)((?:[^)]*)?)?/);
          if (match && match.length > 2) {
            evt = match[2];
            parent = parentWalk(target, evt);
            if (parent) {
              call = true;
              if (match[3] && match[3].indexOf(',') > 0) {
                params.push(...match[3].split(',').map((s: any) => {
                  const param = s.trim().replace(/^["']|["']$/g, '');
                  if (param === 'true' || param === '!0') { return true; }
                  if (param === 'false' || param === '!1') { return false; }
                  if (!isNaN(param)) { return param - 0; }
                  return param;
                }).slice(1));
              }
            }
          }
        }
        if (call) {
          const ee: any = {};
          // shallow copy legacy event including non-owned
          for (let prop in e) {
            ee[prop] = e[prop];
          }
          ee.detail = (e as CustomEvent).detail;
          if (asy) {
            await parent[evt].call(parent, ee, ...params);
          } else {
            parent[evt].call(parent, ee, ...params);
          }
        } else {
          throw new Error(`[@nyaf] There is an event handler '${evt}' attached
          that could not be found in the component <${target.tagName}>.`);
        }
      }
    }
  }

  public static get TagExpander(): Map<string, IExpander> {
    return GlobalProvider.tagExpander;
  }

}
