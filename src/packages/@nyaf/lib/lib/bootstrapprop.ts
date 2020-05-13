import { Component, ExpanderInstance } from '../types/common';
import { Routes } from './router/routes';

/**
 * For registration we handle just the types, not actual instances. And types are actually functions.
 */
export class BootstrapProp {
  /**
   * Add all components here as types.
   */
  components: Array<Component>;
  /**
   * Optional. Add tag expanders here. Tag expanders are a convenient way to add repeating groups of attriutes to any kind of elements.
   */
  expanders?: Array<ExpanderInstance>;
  /**
   * Optional. Add the router definition here. Path's shall not contain hash signs, even if used in link tags.
   */
  routes?: Routes;
}
