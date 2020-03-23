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
  };
}
