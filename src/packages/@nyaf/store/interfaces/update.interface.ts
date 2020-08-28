
/**
 * An update definition connects a store value to a DOM element's property.
 * When the value changes the element's property is updated automatically.
 * This does not re-render the whole component.
 */
export interface Update<T> {
  /**
   * Any selector that's valid for `querySelectorAll`.
   */
  selector: string;
  /**
   * The property of the selected element that will receive the store value.
   */
  target: keyof HTMLElement | string;
  /**
   * The store type's value that is being monitored.
   */
  store: keyof T & string ;
}
