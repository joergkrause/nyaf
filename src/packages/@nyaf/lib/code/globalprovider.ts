import { IComponent, IDirective } from '../types/common';
import events from './events';
import { Router } from './router/router';
import { RouteDefinition } from './router/routes';
import { DomOp } from './dom-operations';
import { LifeCycle } from '../components/lifecycle.enum';
import { IExpander } from './expander/iexpander';
import { BootstrapProp } from './bootstrapprop';
import { IBaseDirective } from './basedirective';
import { Events_Symbol_Eventlist, Extends_Symbol, CustomElement_Symbol_Selector, Expands_Symbol, Directive_Symbol_Selector } from '../consts/decorator.props';
import { BaseComponent } from '../components/base.component';
import { NFinishComponent } from '../components/smart/nfinish.component';
import { NOutletComponent } from '../components/smart/noutlet.component';
import { NBindComponent } from '../components/smart/nbind.component';

/**
 * Main support class that provides all global functions. You must call at least the {@link bootstrap} method to register components.
 */
export class GlobalProvider {

  public static registeredElements: Array<string> = [];
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
      type[Events_Symbol_Eventlist].forEach((evt: string) => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
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
    // register custom components
    GlobalProvider.bootstrapProps.components.forEach(c => {
      // add to browsers web component registry
      GlobalProvider.register(c);
    });
    // expanders
    if (GlobalProvider.bootstrapProps.expanders) {
      // expand and execute decorator
      GlobalProvider.bootstrapProps.expanders.forEach(expanderType => {
        const ex = new expanderType();
        if (!ex[Expands_Symbol]) {
          console.error('Illegal expander, you must set the @Expand decorator to name the expander');
        } else {
          GlobalProvider.tagExpander.set(ex[Expands_Symbol], ex);
        }
      });
    }
    if (GlobalProvider.bootstrapProps.directives) {
      BaseComponent.registeredDirectives = new Map();
      GlobalProvider.bootstrapProps.directives.forEach((bd: IBaseDirective) => {
        BaseComponent.registeredDirectives.set(bd[Directive_Symbol_Selector], bd as unknown as IDirective);
      });
    }
    // register smart components
    customElements.define('n-outlet', NOutletComponent);
    customElements.define('n-finish', NFinishComponent);
    customElements.define('n-bind', NBindComponent);

    // register events
    events.map(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));

    // that's not enough, we need to wait for all components' render process
    const customComponents: Promise<void>[] = [];
    // loop through all alread statically set components
    GlobalProvider.bootstrapProps.components.forEach(c => {
      // get all appearances
      [].slice.call(document.getElementsByTagName(c[CustomElement_Symbol_Selector])).forEach((e: BaseComponent) => {
        // make a promise to wait for the renderer
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
  public static get routerConfig(): RouteDefinition {
    return GlobalProvider.bootstrapProps.routes;
  }

  private static parentWalk(el: HTMLElement, evt: string): any {
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
    return GlobalProvider.parentWalk(el.parentElement, evt);
  };

  private static parentProperty(el: HTMLElement, prop: string) : HTMLElement {
    if (el['__data'] && el['__data'][prop]) return el;
    const parent = el.parentElement;
    if (!parent) return null;
    return this.parentProperty(parent, prop);
  }

  /**
   * All events are handled by this helper function. This function shall not be called from user code.
   */
  private static async eventHub(e: Event) {
    if ((<HTMLElement>e.target).getAttribute) {
      let type = e.type;
      if (e instanceof CustomEvent) {
        const className = e.target.constructor.name;
        type = e.type.replace('_' + className, '');
      }
      const target = GlobalProvider.parentProperty((<HTMLElement>e.target), `n-on-${type}`);
      if (target) {
        const asy = !!(<HTMLElement>e.target).getAttribute(`n-async`);
        const targetComponent = GlobalProvider.parentWalk(target, target['__data'][`n-on-${type}`].name);
        const ee: any = {};
          // shallow copy legacy event including non-owned
          for (let prop in e) {
            ee[prop] = e[prop];
          }
          ee.preventDefault = () => e.preventDefault();
          ee.stopImmediatePropagation = () => e.stopImmediatePropagation();
          ee.stopPropagation = () => e.stopPropagation();
          ee.detail = (e as CustomEvent).detail;
          ee.target = target;
        if (asy) {
          await target['__data'][`n-on-${type}`].call(targetComponent, ee);
        } else {
          target['__data'][`n-on-${type}`].call(targetComponent, ee);
        }
      }
    }
  }

  public static get TagExpander(): Map<string, IExpander> {
    return GlobalProvider.tagExpander;
  }

}
