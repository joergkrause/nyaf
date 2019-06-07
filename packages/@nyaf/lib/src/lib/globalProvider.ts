import { Component, ComponentType } from '../types/common';
import { BaseComponent } from '../components/base.component';
import events from './events';

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
  routes?: { [path: string]: { component: Component; data?: any } };
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
    console.log('register', type.selector);
    customElements.define(type.selector, type);
    GlobalProvider.registeredElements.push(type.selector.toUpperCase());
  }

  /**
   * The global configuration. This call is required.
   * @param props Provide module properties with registration and settings.
   */
  static bootstrap(props: BootstrapProp) {
    // register components
    props.components.forEach(c => GlobalProvider.register(c));
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
    // find the outlet after ready
    const outlet = document.querySelector('[n-router-outlet]');
    // is completely voluntery
    if (outlet) {
      // handle history
      const onNavItemClick = pathName => {
        window.history.pushState({}, pathName, window.location.origin + pathName);
      };
      // listen for any click event and check n-link attribute
      document.addEventListener('click', e => {
        const nLink = (<HTMLElement>e.target).getAttribute('n-link');
        if (nLink) {
          // handle classes
          document.querySelectorAll('[n-link]').forEach(linkElement => linkElement.classList.remove(linkElement.getAttribute('n-link')));
          (<HTMLElement>e.target).classList.add(nLink);
          // handle click
          const pf = (<HTMLAnchorElement>e.target).href.split('#');
          let requestedRoute = '';
          let needFallback = false;
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
            break;
          } while (true);
          // only execute if useful
          if (!needFallback || (needFallback && props.routes['**'])) {
            const activatedComponent = props.routes[requestedRoute].component;
            onNavItemClick(requestedRoute);
            outlet.innerHTML = `<${activatedComponent.selector}></${activatedComponent.selector}>`;
          } else {
            console.warn(
              '[NYAF] A router link call has been executed,' + 'but requestes link is not properly configured: ' + (<HTMLAnchorElement>e.target).href
            );
          }
        }
      });
      // set default '/': { component: DemoComponent },
      const defaultRoute = props.routes['/'];
      if (defaultRoute) {
        const activatedComponent = defaultRoute.component;
        outlet.innerHTML = `<${activatedComponent.selector}></${activatedComponent.selector}>`;
      }
    }
  }

  /**
   * All events are handled by this helper function. This function shall not be called from user code.
   */
  private static eventHub(e: Event) {

    const parentWalk = (el) => {
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
      let evt = (<HTMLElement>e.target).getAttribute(`n-on-${e.type}`);
      if (evt) {
        let call = false;
        let asy = false;
        const parent = parentWalk(e.target);
        // if there is a method attached call with right binding
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
          if (asy) {
            setTimeout(parent[evt].call(parent, e), 0);
          } else {
            parent[evt].call(parent, e);
          }
        } else {
          throw new Error(`[NYAF] There is an event handler '${evt}' attached
          that could not be found in the component <${parent.tagName}>.`);
        }
      }
    }
  }
}
