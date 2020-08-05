import { IComponent, IDirective } from '../types/common';
import events from './events';
import { Router } from './router/router';
import { Routes } from './router/routes';
import { DomOp } from './dom-operations';
import { IBaseComponent } from '../components/base.component';
import { LifeCycle } from '../components/lifecycle.enum';
import { IExpander } from './expander/iexpander';
import { BootstrapProp } from './bootstrapprop';
import { NRepeaterComponent } from '../components/smart/nrepeater.component';
import { NOutletComponent } from '../components/smart/noutlet.component';
import { IBaseDirective } from './basedirective';

/**
 * Main support class that provides all global functions. You must call at least the @see bootstrap method to register components.
 */
export class GlobalProvider {

  public static registeredElements: Array<string> = [];
  public static registeredDirectives: Map<string, IDirective> = new Map();
  private static tagExpander: Map<string, IExpander> = new Map();
  private static bootstrapProps: BootstrapProp;
  private static router: Router = Router.instance;

  /**
   *
   * @param type Called to register a component. The component must have either the decorator @see CustomElement or
   * provide the tag name in a property calles *selector*. The component must inherit @see Component.
   */
  static register(type: IComponent) {
    if ((type as any).__extends_element__) {
      customElements.define(type.selector, type, { extends: (type as any).__extends_element__ });
    } else {
      customElements.define(type.selector, type);
    }
    GlobalProvider.registeredElements.push(type.selector.toUpperCase());
    if (type.customEvents) {
      type.customEvents.forEach(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
    }
  }

  /**
   * The global configuration. This call is required.
   * @param props Provide module properties with registration and settings.
   */
  public static bootstrap(props: BootstrapProp) {
    GlobalProvider.bootstrapProps = props;
    // register smart components
    customElements.define('n-repeat', NRepeaterComponent);
    customElements.define('n-outlet', NOutletComponent);
    // register custom components
    GlobalProvider.bootstrapProps.components.forEach(c => {
      // add to browsers web component registry
      GlobalProvider.register(c);
    });
    // expanders
    if (props.expanders) {
      // expand and execute decorator
      const expanders = props.expanders.map(e => new e());
      expanders.forEach(ex => {
        if (!ex['__expand__']) {
          console.error('Illegal expander, you must set the @Expand decorator to name the expander');
        } else {
          GlobalProvider.tagExpander.set(ex['__expand__'], ex);
        }
      });
    }
    if (props.directives) {
      props.directives.forEach((bd: IBaseDirective) => {
        GlobalProvider.registeredDirectives.set(bd['selector'], bd as unknown as IDirective);
      });
    }
    // register events
    events.map(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
    // register routes
    document.onreadystatechange = () => {
      // wait for document
      if (document.readyState === 'complete') {
        // that's not enough, we need to wait for all components' async render process
        const customComponents: Promise<void>[] = [];
        // loop through all alread statically set components
        GlobalProvider.bootstrapProps.components.forEach(c => {
          // get all appearances
          [].slice.call(document.getElementsByTagName(c.selector)).forEach((e: IBaseComponent) => {
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
          GlobalProvider.router.registerRouter(props.routes);
        });
      }
    };
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
    const parentWalk = (el: HTMLElement, evt: string) => {
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
          const match = evt.match(/^(?:(\(?.+\)?|.?)\s?=>\s?)?this\.([^(]*)((?:[^)]*)?)?/);
          if (match && match.length > 2) {
            evt = match[2];
            parent = parentWalk(target, evt);
            if (parent) {
              call = true;
              if (match[3] && match[3].indexOf(',') > 0) {
                params.push(...match[3].split(',').map(s => {
                  const param = s.trim();
                  if (param === 'true') { return true; }
                  if (param === 'false') { return false; }
                  if (!isNaN(param)) { return param - 0; }
                  return param.replace(/^'|'$/g, '');
                }).slice(1));
              }
            }
          }
        }
        if (call) {
          const ee: any = {};
          ee.bubbles = e.bubbles;
          ee.cancelBubble = e.cancelBubble;
          ee.cancelable = e.cancelable;
          ee.composed = e.composed;
          ee.currentTarget = e.currentTarget;
          ee.defaultPrevented = e.defaultPrevented;
          ee.eventPhase = e.eventPhase;
          ee.isTrusted = e.isTrusted;
          ee.returnValue = e.returnValue;
          ee.srcElement = target;
          ee.target = target;
          ee.timeStamp = e.timeStamp;
          ee.type = type;
          ee.preventDefault = () => e.preventDefault();
          ee.stopImmediatePropagation = () => e.stopImmediatePropagation();
          ee.stopPropagation = () => e.stopPropagation();
          ee.AT_TARGET = e.AT_TARGET;
          ee.BUBBLING_PHASE = e.BUBBLING_PHASE;
          ee.CAPTURING_PHASE = e.CAPTURING_PHASE;
          ee.NONE = e.NONE;
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
