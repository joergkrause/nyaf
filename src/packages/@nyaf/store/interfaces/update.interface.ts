
export interface Update<T> {
  /**
   * Any selector that's valid for `querySelector`. Must return a single element.
   */
  selector: string;
  /**
   * The property of the selected element that will receive the store value.
   */
  target: keyof HTMLElement | string;
  /**
   * The stores value that is being monitored.
   */
  store: keyof T;
}
