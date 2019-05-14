import { Component, ComponentType } from "../types/common";
import { BaseComponent } from "../components/base.component";

/**
 * For registration we handle just the types, not actual instances. And types are actually functions.
 */
export class BootstrapProp {
  components: Array<Component>;
  routes: { [path: string]:  { component: Component, data?: any } }
}

/**
 * Main support class that provides all global functions.
 */
export class globalProvider {
  /**
   *
   * @param type Called to register a component. The component must have either the decorator @see CustomElement or
   * provide the tag name in a property calles *selector*. The component must inherit @see Component.
   */
  static register(type: Component) {
    console.log('register', type.selector);
    customElements.define(type.selector, type);
  }

  static bootstrap(props: BootstrapProp) {
    // register components
    props.components.forEach(c => globalProvider.register(c));
    // register events
    document.addEventListener('click', e => globalProvider.eventHub(e));
    document.addEventListener('keypress', e => globalProvider.eventHub(e));
    document.addEventListener('dblclick', e => globalProvider.eventHub(e));
    // register routes
    // find the outlet
    const outlet = document.querySelector('[n-router-outlet]');
    // is completely voluntery
    if (outlet) {
      // handle history
      let onNavItemClick = (pathName) => {
        window.history.pushState(
          {}, 
          pathName,
          window.location.origin + pathName
        );
      }
      // listen for any click event
      document.addEventListener('click', e => {
        if ((<HTMLElement>e.target).tagName === 'A'){
          const requestedRoute = (<HTMLAnchorElement>e.target).href.split('#')[1];
          const activatedComponent = props.routes[requestedRoute].component;
          onNavItemClick(requestedRoute);
          // https://github.com/WebReflection/classtrophobic
          // https://github.com/WebReflection/document-register-element/issues/142
          outlet.innerHTML = `<${activatedComponent.selector}></${activatedComponent.selector}>`; // Object.create(activatedComponent.prototype).render();
        }
      });
    }

  }
  /**
   * All events are handled by this helper function. This function shall not be called from user code.
   */
  private static eventHub(e: UIEvent) {
    let evt = (<HTMLElement>e.target).getAttribute(`n-on-${e.type}`);
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