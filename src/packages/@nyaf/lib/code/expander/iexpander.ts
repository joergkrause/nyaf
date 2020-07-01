/**
 * Implementers should return a chain of tag attributes, such as 'class="button" data-id="800"'.
 * This series of attributes will become part of the rendered tag before the browser can process it.
 * The values shall be static, in regular quotes.
 */
export interface IExpander {
  expand(): string;
}
