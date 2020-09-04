/**
 * The Extends decorator. Experimental.
 *
 * If decorated, the component will register itself as an extension of the given element.
 * If omitted, {@link {HTMLElement}} is being used. Usage:
 *
 * `@extends('a')`
 *
 * That extends an {@link @{HTMLAnchorElement}} and hence inherits all given properties and behaviors.
 *
 * @param elementName The tag name of the element that now forms the base element.
 */
export function Extends(elementName: string) {
  // the original decorator
  function extendsInternal(target: Object): void {
    extendsInternalSetup(target, elementName);
  }

  // return the decorator
  return extendsInternal;
}

function extendsInternalSetup(target: any, elementName: string) {

  Object.defineProperty(target, '__extends_element__', {
    value: elementName,
    enumerable: false,
    configurable: false
  });
}
