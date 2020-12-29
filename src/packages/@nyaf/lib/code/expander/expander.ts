import { IExpander } from './iexpander';
/**
 * The default implementation of a simple expander. This class can expand properties into static attributes.
 */
export class Expander implements IExpander {
  /**
   * @ignore
   * The actual expander function used in the JSX transformer.
   */
  public expand(): { [prop: string]: any } {
    const props = Object.getOwnPropertyNames(this)
      .map(n => ({ key: n, val: this[n] }))
      .reduce((m, o) => { m[o.key] = o.val; return m }, {});
    return props;
  }
}
