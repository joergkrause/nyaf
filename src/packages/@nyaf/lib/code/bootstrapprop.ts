import { IComponent, IExpanderInstance } from '../types/common';
import { RouteDefinition } from './router/routes';

/**
 * For registration we handle just the types, not actual instances. And types are actually functions.
 */
export class BootstrapProp {
  /**
   * Add all components here as types.
   */
  components: Array<IComponent>;
  /**
   * Attrinute extensions with access to the host element.
   */
  directives?: Array<any>;
  /**
   * Optional. Add tag expanders here. Tag expanders are a convenient way to add repeating groups of attriutes to any kind of elements.
   */
  expanders?: Array<IExpanderInstance>;
  /**
   * Optional. Add the router definition here. Path's shall not contain hash signs, even if used in link tags.
   */
  routes?: RouteDefinition;
}
