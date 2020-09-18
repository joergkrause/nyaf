import { Directive_Symbol_Selector } from '../consts/decorator.props';

/**
 * The Directive decorator defines a selector, for which a directive class can be assigned.
 * To create a directive, write class and decorate it with this decorator. Then, register the
 * class with the {@link GlobalProvider}. If the element that matches the selector appears
 * in a component and run time, the class gets instantiated and receives a reference to the
 * hosting component. In the class one can add any kind of non UI activity, including handling of
 * events on the host component and manipulating the host. A good example is the ability to add
 * drag-n-drop functionality to any sort of component through a directive.
 *
 * @example
 * ```
 * @Directive('[directive="dragdrop"]')
 * export class DragDropDirective {
 *   constructor(host: HTMLElement) {
 *    // Do something on the host
 *   }
 * }
 * ```
 * @param selector
 */
export function Directive(selector: string) {
  return function (target: any) {
    Object.defineProperty(target, Directive_Symbol_Selector, {
      get: () => {
        return selector;
      },
      enumerable: false,
      configurable: false
    });
  };
}
