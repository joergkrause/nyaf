import { Component, ComponentType } from '../types/common';
import { BaseComponent } from '../components/base.component';

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
  /**
   *
   * @param type Called to register a component. The component must have either the decorator @see CustomElement or
   * provide the tag name in a property calles *selector*. The component must inherit @see Component.
   */
  static register(type: Component) {
    console.log('register', type.selector);
    customElements.define(type.selector, type);
  }

  /**
   * The global configuration. This call is required.
   * @param props Provide module properties with registration and settings.
   */
  static bootstrap(props: BootstrapProp) {
    // register components
    props.components.forEach(c => GlobalProvider.register(c));
    // register events
    document.addEventListener('click', e => GlobalProvider.eventHub(e));
    document.addEventListener('keypress', e => GlobalProvider.eventHub(e));
    document.addEventListener('dblclick', e => GlobalProvider.eventHub(e));
    // register routes
    // find the outlet
    const outlet = document.querySelector('[n-router-outlet]');
    // is completely voluntery
    if (outlet) {
      // handle history
      const onNavItemClick = pathName => {
        window.history.pushState({}, pathName, window.location.origin + pathName);
      };
      // listen for any click event and check n-link attribute
      document.addEventListener('click', e => {
        if ((<HTMLElement>e.target).getAttribute('n-link')) {
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
              '[NYAF] A router link call has been executed,'
              + 'but requestes link is not properly configured: '
              + (<HTMLAnchorElement>e.target).href
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
  private static eventHub(e: UIEvent) {
    const evt = (<HTMLElement>e.target).getAttribute(`n-on-${e.type}`);
    if (evt) {
      // if there is a method attached call with right binding
      if ((<HTMLElement>e.target).parentElement[evt]) {
        (<HTMLElement>e.target).parentElement[evt].call((<HTMLElement>e.target).parentElement, e);
      } else {
        throw new Error(`[NYAF] There is an event handler ${evt} attached that is not supported by corresponding method in ${e.target}`);
      }
    }
  }
}
