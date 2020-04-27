import { Component } from '../../types/common';

/**
 * Definition of a single route. Determines the behavior.
 */
export interface Routes {
  [path: string]: {
    /**
     * The component that is being lodaed into the outlet.
     */
    component: Component;
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
     * Rewrites a component even if already set. This is useful if the rendering of the component
     * is dynamic and changes with the actual path. In that case one can set several paths' with
     * the very same component. The default ist `false` and the selector is being cached.
     * @default false
     */
    forced?: boolean;
  };
}
