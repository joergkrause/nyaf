import { DomOp } from '../dom-operations';
import { Routes } from './routes';
import { RouteEventTarget } from './navigate.event';
import { CustomElement_Symbol_Selector } from '@nyaf/lib/consts/decorator.props';

const N_LINK = 'n-link';
const N_LINK_SEL = `[${N_LINK}]`;

/**
 * The router implementation. Usually, there is no need to call this class directly.
 *
 * The only method one need is the {@link navigateRoute} method to call a route path programmaticially.
 */
export class Router {

  private static _routerInstance: Router;
  private static _routes: Routes;
  public onRouterAction: RouteEventTarget;
  public outlets: Array<HTMLElement> = [];

  public static getInstance(forceReset = false): Router {
    if (!this._routerInstance || forceReset) {
      this._routerInstance = new Router();
    }
    return this._routerInstance;
  }

  /**
   * Called by the bootstrapper to setup a route environment. The route definition is held in memory as static object.
   * @param routes The route definition
   */
  public registerRouter(routes: Routes) {
    Router._routes = routes;
    // find the outlets after ready
    this.outlets = Array.prototype.slice.call(document.querySelectorAll<HTMLElement>(`[n-router-outlet],n-outlet`));
    if (this.outlets) {
      // prepare router events
      this.onRouterAction = new RouteEventTarget(routes);
      window.addEventListener('hashchange', (event: HashChangeEvent) => {
        // Currently we suport hash location strategy only
        if (window.location.hash === event.oldURL.substring(event.oldURL.indexOf('#'))) {
          // we're already on that path and there is no additional action required
          event.preventDefault();
          return false;
        }
        let externalhashPath = event.newURL.substring(event.newURL.indexOf('#')); // (event. as any).path[0].location.hash || event.path[0].location.pathname;
        if (externalhashPath.endsWith('/')) {
          externalhashPath = externalhashPath.slice(0, -1);
        }
        const requestedRoute = externalhashPath ? externalhashPath.replace(/^#\//, '/') : '/';
        const activatedComponent = routes[requestedRoute] ? routes[requestedRoute].component as unknown as Node : null;
        if (activatedComponent) {
          const outletName = routes[requestedRoute].outlet;
          const outlet = this.queryOutlet(outletName);
          this.setRouterOutlet(activatedComponent, externalhashPath, outlet, routes[requestedRoute].forced);
          this.setLinkElements(requestedRoute);
        }
      });
      if (routes) {
        const defaultRoute = routes['/'];
        if (defaultRoute) {
          const activatedComponent = defaultRoute.component as unknown as Node;
          // default route goes always to default outlet
          this.onNavItemClick('/');
          const outlet = this.queryOutlet();
          this.setRouterOutlet(activatedComponent, '/', outlet, defaultRoute.forced);
          this.setLinkElements('/');
        }
        // in case we have any "forced" routes, we need to invoke even if there is no hashchange
        const forcedRoutes = Object.keys(routes)
          .filter(route => routes[route].forced)
          .map((attr) => `[href$="${attr}"]`)
          .join(' ');
        const linkElements = document.querySelectorAll<HTMLAnchorElement>(`${N_LINK_SEL} ${forcedRoutes}`);
        linkElements.forEach((linkElement) => {
          // if (linkElement.href.endsWith())
          linkElement.addEventListener('click', (e: Event) => {
            const linkElement = e.target as HTMLAnchorElement;
            const requestedRoute = linkElement.href.replace(/^#\//, '/');
            if (routes[requestedRoute]) {
              const activatedComponent =  routes[requestedRoute].component as unknown as Node;
              this.onNavItemClick(requestedRoute);
              const outletName = routes[requestedRoute].outlet;
              const outlet = this.queryOutlet(outletName);
              this.setRouterOutlet(activatedComponent, requestedRoute, outlet, true);
              this.setLinkElements(requestedRoute);
            }
          });
        })
      }
    }
  }

  /**
   * Invoke a programmatic navigation to the given route. Falls back to default if route not found.
   * Throws an error if no default route.
   * @param requestedRoute String value of the route's name. Same as in the `href` attribute when defining links.
   * @param outletName The target. Can be omitted, if the default (main) router outlet is being adressed or the router configuration provides static outlets.
   */
  public navigateRoute(requestedRoute: string, outletName?: string) {
    const routes: Routes = Router._routes;
    let outlet: HTMLElement;
    let activatedComponent: Node = routes[requestedRoute]?.component as unknown as Node;
    const forced = routes[requestedRoute]?.forced || false;
    if (!activatedComponent) {
      activatedComponent = routes['/']?.component as unknown as Node;
    }
    if (!activatedComponent) {
      throw new Error('Route not found and no default route defined');
    }
    if (!outletName) {
      outletName = routes[requestedRoute].outlet;
    }
    outlet = this.queryOutlet(outletName);

    if (outlet) {
      this.setRouterOutlet(activatedComponent, requestedRoute, outlet, forced);
    } else {
      throw new Error('Outlet not found or route improper configured.');
    }
  }

  // handle history if not invoked by hashchanged
  private onNavItemClick(pathName: string, title?: string) {
    if (title) {
      document.title = title;
    }
    window.history.pushState({ pathName }, pathName, window.location.origin + pathName);
  }

  private setLinkElements(route: string) {
    // deactivate all
    const linkElements = document.querySelectorAll(N_LINK_SEL);
    linkElements.forEach(linkElement => linkElement.classList.remove(linkElement.getAttribute(N_LINK)));
    // activate all with matching route
    const setElements = document.querySelectorAll(`${N_LINK_SEL} [href$="#${route}]`);
    setElements.forEach((linkElement) => linkElement.classList.add(linkElement.getAttribute(N_LINK)));
  }

  private queryOutlet(outletName?: string): HTMLElement {
    const outlet = outletName
      ? document.querySelector<HTMLElement>(`[n-router-outlet="${outletName}"],n-outlet[name="${outletName}"]`)
      : document.querySelector<HTMLElement>(`[n-router-outlet],n-outlet`);
    return outlet;
  }

  private setRouterOutlet(activatedComponent: Node, requestedRoute: string, outlet: Element, forced: boolean) {
    let event = this.createEvent('navigate', true, requestedRoute);
    this.onRouterAction.dispatchEvent(event);
    const activatedElement = document.createElement(activatedComponent[CustomElement_Symbol_Selector]);
    switch (outlet.tagName) {
      case 'N-OUTLET':
        if (forced || this.needToLoad(outlet.firstElementChild, activatedComponent)) {
          if (outlet.firstElementChild) {
            outlet.replaceChild(activatedElement, outlet.firstElementChild);
          } else {
            outlet.appendChild(activatedElement);
          }
        }
        break;
      default:
        // outlet is any HTMLElement
        if (forced || this.needToLoad(outlet.firstChild, activatedComponent)) {
          if (outlet.firstChild) {
            outlet.replaceChild(activatedElement, outlet.firstChild);
          } else {
            outlet.appendChild(activatedElement);
          }
        }
        break;
    }
    event = this.createEvent('navigated', false, requestedRoute);
    this.onRouterAction.dispatchEvent(event);
  }

  private createEvent(name: string, cancelable: boolean, requestedRoute: string): CustomEvent {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable,
      composed: true,
      detail: requestedRoute
    });
    return event;
  }

  private needToLoad(outletChild: Node, activatedComponent: Node): boolean {
    return (!outletChild || outletChild['__uniqueId__'] as Node !== activatedComponent['__uniqueId__']);
  }


  // private invokeLinkTarget(target: HTMLElement) {
  //     let nLink = target.getAttribute(N_LINK);
  //     if (!nLink) {
  //       // walk up the tree to find next n-link
  //       const parents = DomOp.getParents(target, `${N_LINK_SEL}`);
  //       if (parents && parents.length === 1) {
  //         target = parents[0];
  //         nLink = target.getAttribute(N_LINK);
  //       }
  //     }
  //     if (nLink) {
  //       // expect that n-link is on an anchor tag
  //       const pf = (<HTMLAnchorElement>target).href.split('#');
  //       let requestedRoute = '';
  //       let needFallback = false;
  //       let outletName = '';
  //       // fallback strategy
  //       do {
  //         if (pf.length !== 2) {
  //           needFallback = true;
  //           break;
  //         }
  //         requestedRoute = pf[1];
  //         if (!requestedRoute) {
  //           needFallback = true;
  //           break;
  //         }
  //         if (!routes[requestedRoute]) {
  //           needFallback = true;
  //           break;
  //         }
  //         outletName = routes[requestedRoute].outlet;
  //         break;
  //       } while (true);
  //       // only execute if useful, here we have a valid route
  //       if (!needFallback || (needFallback && routes['**'])) {
  //         const activatedComponent = routes[requestedRoute].component as unknown as Node;
  //         const forced = routes[requestedRoute].forced;
  //         if (!requestedRoute.startsWith('#')) {
  //           requestedRoute = `#${requestedRoute}`;
  //         }
  //         onNavItemClick(requestedRoute);
  //         const outlet = this.queryOutlet(outletName);
  //         this.setRouterOutlet(activatedComponent, requestedRoute, outlet, forced);
  //       } else {
  //         console.warn(
  //           '[@nyaf] A router link call has been executed,' +
  //           'but requested link is not properly configured: ' +
  //           (<HTMLAnchorElement>e.target).href
  //         );
  //       }
  //     }
  // }
}