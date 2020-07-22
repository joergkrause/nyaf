import { Routes } from './routes';

/**
 * After the router has navigated, this event target is being fired on the method @see GlobalProvider.navigateRoute
 */
export class RouteEventTarget extends EventTarget {

  private _routes: Routes;

  constructor(routes: Routes) {
    super();
    this._routes = routes;
  }

  get routes() { return this._routes; }
}
