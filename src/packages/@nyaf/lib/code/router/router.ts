import { Routes, Action, RouteDefinition } from './routes';
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
  private routes: Routes;
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
  public registerRouter(routes: RouteDefinition): void {
    if (!routes) {
      return;
    }
    this.routes = Object.keys(routes)
      // sort longest path first
      .sort((a, b) => { return b.length - a.length; })
      // convert into more usable format
      .map((path) => {
        return {
          // create regex
          path: new RegExp("^" + path.replace(/:[^\s/]+/g, '([\\w-]+)').replace('/', '\\/').replace('**', '') + "$"),
          action: routes[path]
        };
      });
    // find the outlets after ready
    this.outlets = Array.prototype.slice.call(document.querySelectorAll<HTMLElement>(`[n-router-outlet],n-outlet`));
    if (!this.outlets || this.outlets.length === 0) {
      console.warn('There are routes available, but no outlet to deliver components. Consider adding an outlet element.');
      return;
    }
    // prepare router events
    this.onRouterAction = new RouteEventTarget(this.routes);
    window.addEventListener('hashchange', (event: HashChangeEvent) => {
      this.handleHashChange(event);
    });
    const defaultAction = this.getRoute('/');
    if (defaultAction) {
      const activatedComponent = defaultAction.component as unknown as Node;
      // default route goes always to default outlet
      this.onNavItemClick('/');
      const outlet = this.queryOutlet();
      this.setRouterOutlet(activatedComponent, '/', outlet, defaultAction.forced);
      this.setLinkElements('/');
    }
    // in case we have any "forced" routes, we need to invoke even if there is no hashchange
    const forcedRoutes = this.getForcedRoutes();
    const linkElements = document.querySelectorAll<HTMLAnchorElement>(`${N_LINK_SEL} ${forcedRoutes}`);
    linkElements.forEach((linkElement) => {
      // if (linkElement.href.endsWith())
      linkElement.addEventListener('click', (e: Event) => {
        const linkElement = e.target as HTMLAnchorElement;
        const requestedRoute = linkElement.href.replace(/^#\//, '/');
        const routeAction = this.getRoute(requestedRoute);
        if (routeAction === false) {
          return;
        }
        const activatedComponent = routeAction.component as unknown as Node;
        this.onNavItemClick(requestedRoute);
        const outletName = routeAction.outlet;
        const outlet = this.queryOutlet(outletName);
        this.setRouterOutlet(activatedComponent, requestedRoute, outlet, true);
        this.setLinkElements(requestedRoute);
      });
    })
  }

  private getRoute(routePath: string): Action | false {
    // TODO: consider https://github.com/pillarjs/path-to-regexp/
    const routes = this.routes;
    for (var i = 0, l = routes.length; i < l; i++) {
      // parse if possible
      var found = routePath.match(routes[i].path);
      if (found) { // parsed successfully
        return routes[i].action;
      }
    }
    return false;
  }

  private getDefaultRoute(): Action | false {
    return this.getRoute('/');
  }

  private getForcedRoutes(): string {
    const forcedRoutes = this.routes
      .filter(route => route.action.forced)
      .map((attr) => `[href$="${attr}"]`)
      .join(' ');
    return forcedRoutes;
  }

  private get allRoutePaths(): RegExp[] {
    return this.routes.map(route => route.path);
  }

  private get hasRoutes(): boolean {
    return (this.routes.length > 0);
  }

  /**
   * Invoke a programmatic navigation to the given route. Falls back to default if route not found.
   * Throws an error if no default route.
   * @param requestedRoute String value of the route's name. Same as in the `href` attribute when defining links.
   * @param outletName The target. Can be omitted, if the default (main) router outlet is being adressed or the router configuration provides static outlets.
   */
  public navigateRoute(requestedRoute: string, outletName?: string): void | never {
    let outlet: HTMLElement;
    let routeAction = this.getRoute(requestedRoute);
    if (routeAction === false) {
      throw new Error('Route not found');
    }
    let activatedComponent: Node = routeAction.component as unknown as Node;
    const forced = routeAction.forced || false;
    if (!activatedComponent) {
      routeAction = this.getDefaultRoute();
      if (routeAction === false) {
        throw new Error('Route found but has no component and default route is not defined');
      }
      activatedComponent = routeAction.component as unknown as Node;
    }
    if (!activatedComponent) {
      throw new Error('Route found has no component and default route has no component either');
    }
    if (!outletName) {
      outletName = routeAction.outlet;
    }
    outlet = this.queryOutlet(outletName);

    if (outlet) {
      this.setRouterOutlet(activatedComponent, requestedRoute, outlet, forced);
    } else {
      throw new Error('Outlet not found or route improper configured.');
    }
  }

  private handleHashChange(event: HashChangeEvent) {
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
    const routeAction = this.getRoute(requestedRoute);
    if (routeAction === false) {
      return;
    }
    const activatedComponent = routeAction.component as unknown as Node;
    if (activatedComponent) {
      const outletName = routeAction.outlet;
      const outlet = this.queryOutlet(outletName);
      this.setRouterOutlet(activatedComponent, externalhashPath, outlet, routeAction.forced);
      this.setLinkElements(requestedRoute);
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