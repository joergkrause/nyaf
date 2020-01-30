import { Component, ComponentType } from '../types/common';
import { BaseComponent } from '../components/base.component';
import events from './events';
import { DomOp } from './dom-operations';
import eventList from './events';
import { Readonly } from '@nyaf/forms';

export interface Routes {
  [path: string]: { component: Component; outlet?: string, data?: any };
}

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
  static registeredElements: Array<string> = [];

  /**
   *
   * @param type Called to register a component. The component must have either the decorator @see CustomElement or
   * provide the tag name in a property calles *selector*. The component must inherit @see Component.
   */
  static register(type: Component) {
    customElements.define(type.selector, type);
    GlobalProvider.registeredElements.push(type.selector.toUpperCase());
    if (type.customEvents) {
      type.customEvents.forEach(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
    }
  }

  /**
   * The global configuration. This call is required.
   * @param props Provide module properties with registration and settings.
   */
  static bootstrap(props: BootstrapProp) {
    // register components
    props.components.forEach(c => {
      // add to browsers web component registry
      GlobalProvider.register(c);
    });
    // register events
    events.map(evt => document.addEventListener(evt, e => GlobalProvider.eventHub(e)));
    // register routes
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.registerRouter(props);
      }
    };
  }

  private static registerRouter(props: BootstrapProp) {
    // find the outlets after ready
    const outlets = document.querySelectorAll('[n-router-outlet]');
    // is completely voluntery
    if (outlets) {
      // handle history
      const onNavItemClick = pathName => {
        window.history.pushState({}, pathName, window.location.origin + pathName);
      };
      // listen for any click event and check n-link attribute
      document.addEventListener('click', e => {
        let target = <HTMLElement>e.target;
        let nLink = target.getAttribute('n-link');
        if (!nLink) {
          // walk up the tree to find next n-link
          const parents = DomOp.getParents(target, 'a[n-link]');
          if (parents && parents.length === 1) {
            target = parents[0];
            nLink = target.getAttribute('n-link');
          }
        }
        if (nLink) {
          // handle classes globally
          document.querySelectorAll('[n-link]').forEach(linkElement => linkElement.classList.remove(linkElement.getAttribute('n-link')));
          if (nLink !== 'true') {
            // empty n-link has true as value, that's not a class and we don't set this
            (<HTMLElement>target).classList.add(nLink);
          }
          // expect that n-link is on an anchor tag
          const pf = (<HTMLAnchorElement>target).href.split('#');
          let requestedRoute = '';
          let needFallback = false;
          let outletName = '';
          // fallback strategy
          do {
            if (pf.length !== 2) {
              needFallback = true;
              break;
            }
            requestedRoute = pf[1];
            if (!requestedRoute) {
              needFallback = true;
              break;
            }
            if (!props.routes[requestedRoute]) {
              needFallback = true;
              break;
            }
            outletName = props.routes[requestedRoute].outlet;
            break;
          } while (true);
          // only execute if useful, here we have a valid route
          if (!needFallback || (needFallback && props.routes['**'])) {
            const activatedComponent = props.routes[requestedRoute].component;
            if (!requestedRoute.startsWith('#')) {
              requestedRoute = `#${requestedRoute}`;
            }
            onNavItemClick(requestedRoute);
            const outlet = outletName ? document.querySelector(`[n-router-outlet="${outletName}"]`) : document.querySelector(`[n-router-outlet]`);
            GlobalProvider.setRouterOutlet(activatedComponent, outlet);
          } else {
            console.warn(
              '[NYAF] A router link call has been executed,' +
              'but requestes link is not properly configured: ' +
              (<HTMLAnchorElement>e.target).href
            );
          }
        }
      });
      // set default '/': { component: DemoComponent },
      const defaultRoute = props.routes['/'];
      if (defaultRoute) {
        const activatedComponent = defaultRoute.component;
        // default route goes always to default outlet
        const outlet = document.querySelector(`[n-router-outlet]`);
        GlobalProvider.setRouterOutlet(activatedComponent, outlet);
      }
    }
  }

  private static setRouterOutlet(activatedComponent: Component, outlet: Element) {
    outlet.innerHTML = `<${activatedComponent.selector}></${activatedComponent.selector}>`;
  }

  /**
   * All events are handled by this helper function. This function shall not be called from user code.
   */
  private static eventHub(e: Event) {
    const parentWalk = el => {
      if (!el.parentElement) {
        return el;
      }
      // not really good, will hit parent components with content
      if (GlobalProvider.registeredElements.some(te => (<HTMLElement>el.parentElement).tagName === te)) {
        return el.parentElement;
      }
      return parentWalk(el.parentElement);
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
        let asy = false;
        let evt = target.getAttribute(`n-on-${type}`);
        if (!evt) { return; }
        // if there is a method attached call with right binding
        const parent = parentWalk(target);
        if (parent[evt]) {
          call = true;
        } else {
          // could be an expression
          evt = evt.replace(/^(\(?.\)?|.?)\s?=>\s?this\.(.*)(\(.?\))?/, `$2`);
          if (parent[evt]) {
            call = true;
            asy = !!(<HTMLElement>e.target).getAttribute(`n-async`);
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
          e.preventDefault();
          if (asy) {
            setTimeout(parent[evt].call(parent, ee), 0);
          } else {
            parent[evt].call(parent, ee);
          }
        } else {
          throw new Error(`[NYAF] There is an event handler '${evt}' attached
          that could not be found in the component <${target.tagName}>.`);
        }
      }
    }
  }
}
