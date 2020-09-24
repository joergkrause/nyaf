
/**
 * An update definition connects a store value to a compnents observed attribute.
 * If the store value changes, the attribute will change and trigger the renderer.
 */
export interface UpdateProperty<T, M extends object = any> {
  /**
   * The name of the attribute
   */
  property: keyof M | string;
  /**
   * The store type's value that is being monitored.
   */
  store: keyof T & string ;
}
