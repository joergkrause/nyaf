import { DomOp } from '../dom-operations';
import { Routes } from './routes';
import { Component } from '../../types/common';
import { RouteEventTarget } from './navigate.event';

const N_ROUTER_OUTLET_SEL = '[n-router-outlet]';
const N_LINK = 'n-link';
const N_LINK_SEL = `[${N_LINK}]`;

export class Router {

  private static _routerInstance: Router;
  public onRouterAction: RouteEventTarget;

  public static get instance(): Router {
    if (!this._routerInstance) {
      this._routerInstance = new Router();
    }
    return this._routerInstance;
  }

  public registerRouter(routes: Routes) {
    // find the outlets after ready
    const outlets = document.querySelectorAll(N_ROUTER_OUTLET_SEL);
    // is completely voluntery
    if (outlets) {
      // prepare router events
      this.onRouterAction = new RouteEventTarget(routes);
      // handle history
      const onNavItemClick = pathName => {
        document.title = pathName;
        window.history.pushState({ pathName }, pathName, window.location.origin + pathName);
      };
      window.addEventListener('popstate', (event: any) => {
        // Currently we suport hash location strategy only
        console.log('pop action', event.path[0].location.hash);
        const externalhashPath = event.path[0].location.hash || event.path[0].location.pathName;
        onNavItemClick(externalhashPath);
        const requestedRoute = externalhashPath.replace(/^#\//, '/');
        const activatedComponent = routes[requestedRoute].component;
        const outletName = routes[requestedRoute].outlet;
        const outlet = outletName
          ? document.querySelector(`[n-router-outlet="${outletName}"]`)
          : document.querySelector(N_ROUTER_OUTLET_SEL);
        this.setRouterOutlet(activatedComponent, requestedRoute, outlet);
      });
      // listen for any click event and check n-link attribute
      document.addEventListener('click', e => {
        let target = <HTMLElement>e.target;
        let nLink = target.getAttribute(N_LINK);
        if (!nLink) {
          // walk up the tree to find next n-link
          const parents = DomOp.getParents(target, `a${N_LINK}`);
          if (parents && parents.length === 1) {
            target = parents[0];
            nLink = target.getAttribute(N_LINK);
          }
        }
        if (nLink) {
          // handle classes globally
          document.querySelectorAll(N_LINK_SEL).forEach(linkElement => linkElement.classList.remove(linkElement.getAttribute(N_LINK)));
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
            if (!routes[requestedRoute]) {
              needFallback = true;
              break;
            }
            outletName = routes[requestedRoute].outlet;
            break;
          } while (true);
          // only execute if useful, here we have a valid route
          if (!needFallback || (needFallback && routes['**'])) {
            const activatedComponent = routes[requestedRoute].component;
            if (!requestedRoute.startsWith('#')) {
              requestedRoute = `#${requestedRoute}`;
            }
            onNavItemClick(requestedRoute);
            const outlet = outletName
              ? document.querySelector(`[n-router-outlet="${outletName}"]`)
              : document.querySelector(N_ROUTER_OUTLET_SEL);
            this.setRouterOutlet(activatedComponent, requestedRoute, outlet);
          } else {
            console.warn(
              '[NYAF] A router link call has been executed,' +
              'but requested link is not properly configured: ' +
              (<HTMLAnchorElement>e.target).href
            );
          }
        }
      });
      // set default '/': { component: DemoComponent },
      const defaultRoute = routes['/'];
      if (defaultRoute) {
        const activatedComponent = defaultRoute.component;
        // default route goes always to default outlet
        onNavItemClick('/');
        const outlet = document.querySelector(N_ROUTER_OUTLET_SEL);
        this.setRouterOutlet(activatedComponent, '/', outlet);
      }
    }
  }

  /**
   * Invoke a programmatic navigation to the given route. Falls back to default if route not found.
   * Throws an error if no default route.
   * @param requestedRoute String value of the route's name. Same as in the `href` attribute when defining links.
   * @param outletName The target. Can be omitted, if the default (main) router outlet is being adressed or the router configuration provides static outlets.
   */
  public navigateRoute(routes: Routes, requestedRoute: string, outletName?: string) {
    let outlet: HTMLElement;
    let activatedComponent: Component = routes[requestedRoute]?.component;
    if (!activatedComponent) {
      activatedComponent = routes['/']?.component;
    }
    if (!activatedComponent) {
      throw new Error('Route not found and no default route defined');
    }
    if (!outletName) {
      outletName = routes[requestedRoute].outlet;
    }
    outlet = outletName ? document.querySelector(`[n-router-outlet="${outletName}"]`) : document.querySelector(`[n-router-outlet]`);
    if (outlet) {
      this.setRouterOutlet(activatedComponent, requestedRoute, outlet);
    } else {
      throw new Error('Outlet not found or route improper configured.');
    }
  }


  private setRouterOutlet(activatedComponent: Component, requestedRoute: string, outlet: Element) {
    let event = new CustomEvent('navigate', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: requestedRoute
    });
    this.onRouterAction.dispatchEvent(event);
    outlet.innerHTML = `<${activatedComponent.selector}></${activatedComponent.selector}>`;
    event = new CustomEvent('navigated', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: requestedRoute
    });
    this.onRouterAction.dispatchEvent(event);
  }

}
