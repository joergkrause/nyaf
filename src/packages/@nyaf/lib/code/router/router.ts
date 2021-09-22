import { Routes, Action, RouteDefinition, Route, RouteParams } from './routes';
import { RouteEventTarget } from './routeeventtarget';
import { CustomElement_Symbol_Selector } from '../../consts/decorator.props';
import { matchAll } from '../utils';
import { BaseComponent } from '../../components/base.component';

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
      .map((path: string) => {
        let map: any = [];
        let idx = 0;
        for (let p of matchAll(path, /\/:([^\s/?]+)([?]?)/g)) {
          map.push({
            parameter: p[1],
            optional: !!(p[2] && p[2] === '?'),
            start: p.index + 1
          });
        }
        return {
          // create regex
          path: new RegExp(`^${path.replace(/:[^\s/]+/g, '([\\w-]+)').replace('/', '\\/').replace('**', '')}$`),
          action: routes[path],
          map,
          legacy: path
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
    window.addEventListener('hashchange', async (event: HashChangeEvent) => {
      this.handleHashChange(event);
    });
    const defaultRoute = this.getRoute('/');
    if (defaultRoute) {
      const defaultAction = defaultRoute.action;
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
      linkElement.addEventListener('click', (e: Event) => {
        const currentLinkElement = e.currentTarget as HTMLAnchorElement;
        const requestedRoute = currentLinkElement.href.replace(/.*#\//, '/');
        const linkedRoute = this.getRoute(requestedRoute);
        if (linkedRoute === false) {
          return;
        }
        const routeAction = linkedRoute.action;
        const activatedComponent = routeAction.component as unknown as Node;
        this.onNavItemClick(requestedRoute);
        const outletName = routeAction.outlet;
        const outlet = this.queryOutlet(outletName);
        this.setRouterOutlet(activatedComponent, requestedRoute, outlet, routeAction.forced);
        this.setLinkElements(requestedRoute);
      });
    })
  }

  private getRoute(routePath: string): Route | false {
    // TODO: consider https://github.com/pillarjs/path-to-regexp/
    const routes = this.routes;
    for (var i = 0, l = routes.length; i < l; i++) {
      // parse if possible
      var found = routePath.match(routes[i].path);
      if (found) { // parsed successfully
        if (routes[i].map) {
          routes[i].map
        }
        return routes[i];
      }
    }
    return false;
  }

  private getDefaultRoute(): Route | false {
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
    let navigateRoute = this.getRoute(requestedRoute);
    if (navigateRoute === false) {
      throw new Error('Route not found');
    }
    let routeAction = navigateRoute.action;
    let activatedComponent: Node = routeAction.component as unknown as Node;
    const forced = routeAction.forced || false;
    if (!activatedComponent) {
      navigateRoute = this.getDefaultRoute();
      if (navigateRoute === false) {
        throw new Error('Route found but has no component and default route is not defined');
      }
      routeAction = navigateRoute.action
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
    const requestedRoute = externalhashPath ? externalhashPath.replace(/.*#\//, '/') : '/';
    const hashRoute = this.getRoute(requestedRoute);
    if (hashRoute === false) {
      return;
    }
    const routeAction = hashRoute.action;
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
    const normalizedRoute = this.normalizeRoute(requestedRoute);
    let event = this.createEvent('navigate', true, normalizedRoute);
    this.onRouterAction.dispatchEvent(event);
    let activatedElement: BaseComponent<any>;
    if (forced || !outlet.firstElementChild || outlet.firstElementChild.tagName.toLowerCase() !== activatedComponent[CustomElement_Symbol_Selector]) {
      activatedElement = document.createElement(activatedComponent[CustomElement_Symbol_Selector]);
    } else {
      activatedElement = outlet.firstElementChild as BaseComponent<any>;
    }
    const mapping = this.getRoute(normalizedRoute);
    if (mapping) {
      let start = normalizedRoute;
      mapping.map.forEach((m: RouteParams) => {
        // this extracts the real parameter into the parameter object
        start = normalizedRoute.substr(mapping.map[0].start);
        const len = start.indexOf('/') > 0 ? start.indexOf('/') : start.length;
        const value = start.substr(0, len);
        m.value = value;
        // if the router definition has instructions to convert parameters into attributes
        if (mapping.action.map && mapping.action.map[m.parameter]) {
          activatedElement['__data'][mapping.action.map[m.parameter]] = value;
        }
      });
      activatedElement['__data']['routeParams'] = mapping.map;
    }
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
        let currentElement = null;
        if (outlet.firstChild) {
          // correct outlet content in case some illegal DOM operation happened
          currentElement = customElements.get((outlet.firstChild as HTMLElement).tagName.toLowerCase());
          if (!currentElement) {
            outlet.innerHTML = '';
            forced = true;
          }
        }
        if (forced || this.needToLoad(outlet.firstChild, activatedElement)) {
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

  private needToLoad(currentElement: Node, activatedElement: Node): boolean {
    return (!currentElement || currentElement['__uniqueId__'] as Node !== activatedElement['__uniqueId__']);
  }

  private normalizeRoute(requestedRoute: string): string {
    return requestedRoute.replace(/^#/, '');
  }

}