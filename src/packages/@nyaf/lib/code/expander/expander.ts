import { IExpander } from './iexpander';
/**
 * The default implementation of a simple expander. This class can expand properties into static attributes.
 */
export class Expander implements IExpander {
  /**
   * The actual expander function
   */
  public expand(): string {
    const props = Object.keys(this).map(key => {
      return `${key}="${this[key]}"`;
    }).join(' ');
    return props;
  }
}
