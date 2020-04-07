import { Component } from '../types/common';
import events from './events';
import { Router } from './router/router';
import { Routes } from './router/routes';
import { DomOp } from './dom-operations';

/**
 * For registration we handle just the types, not actual instances. And types are actually functions.
 */
export class BootstrapProp {
  /**
   * Add all components here as types.
   */
  components: Array<Component>;
  /**
   * Optional. Add the router definition here. Path's shall not contain hash signs, even if used in link tags.
   */
  routes?: Routes;
}

/**
 * Main support class that provides all global functions.
 */
export class GlobalProvider {

  private static registeredElements: Array<string> = [];
  private static bootstrapProps: BootstrapProp;
  private static router: Router = Router.instance;

  /**
   *
   * @param type Called to register a component. The component must have either the decorator @see CustomElement or
   * provide the tag name in a property calles *selector*. The component must inherit @see Component.
   */
  static register(type: Component) {
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
    // register components
    GlobalProvider.bootstrapProps.components.forEach(c => {
      // add to browsers web component registry
      GlobalProvider.register(c);
    });
    // register events
    events.map(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
    // register routes
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        // prepare route
        GlobalProvider.router.registerRouter(props.routes);
      }
    };
  }

  public static get routerAction() {
    return GlobalProvider.router.onRouterAction;
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
          const match = evt.match(/^(\(?.\)?|.?)\s?=>\s?this\.([^(]*)\(([^)]*)?/);
          if (match.length > 2) {
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
                  return param;
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
          ee.preventDefault = e.preventDefault;
          ee.stopImmediatePropagation = e.stopImmediatePropagation;
          ee.stopPropagation = e.stopPropagation;
          ee.AT_TARGET = e.AT_TARGET;
          ee.BUBBLING_PHASE = e.BUBBLING_PHASE;
          ee.CAPTURING_PHASE = e.CAPTURING_PHASE;
          ee.NONE = e.NONE;
          ee.detail = (e as CustomEvent).detail;
          // e.preventDefault();
          if (asy) {
            await parent[evt].call(parent, ee, ...params);
          } else {
            parent[evt].call(parent, ee, ...params);
          }
        } else {
          throw new Error(`[NYAF] There is an event handler '${evt}' attached
          that could not be found in the component <${target.tagName}>.`);
        }
      }
    }
  }
}
