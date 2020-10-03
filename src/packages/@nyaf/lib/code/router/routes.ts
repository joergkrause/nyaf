import { IComponent } from '../../types/common';

/**
 * Definition of a single route.
 */
export interface Action {

  /**
   * The component that is being lodaed into the outlet.
   */
  component: IComponent;

  /**
   * The outlet that is choosen. Can be omitted, if there is only one outlet in the app.
   * As there is no default outlet, the name must be provided, if there a re more outlets.
   */
  outlet?: string;

  /**
   * A data field that the router can retrieve on request. It's just a common way to transport
   * private data. The field is not being used internally.
   */
  data?: { [name: string]: any };

  /**
   * Maps a path parameters, written as ':id' for example, into an observed attribute. Without mapping, the
   * parameters appear in a protected property `routerParams`. That field always exists and is supported
   * by the {@link IRouterParams} interface.
   */
  map?: { [name: string]: string };

  /**
   * Rewrites a component even if already set. This is useful if the rendering of the component
   * is dynamic and changes with the actual path. In that case one can set several paths' with
   * the very same component. The default ist `false` and the selector is being cached.
   * @default false
   */
  forced?: boolean;
}

export interface RouteParams {
  parameter: string;
  optional: boolean;
  start: number;
  value?: any;
}

/**
 * Definition of a single routes with all information attached. Determines the behavior of the router.
 * @internal
 */
export interface Route {
  path: RegExp;
  action: Action;
  // parameter map
  map?: RouteParams[],
  legacy: string;
}

/**
 * Definition of all routes. Determines the behavior of the router.
 * @internal
 */
export type Routes = Route[];

/**
 * The definition used to register routes. This is a simplified view of the internal store.
 */
export interface RouteDefinition {
  [path: string]: Action;
}
