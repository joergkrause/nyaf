/**
 * The Extends decorator.
 *
 * If decorated, the component will register itself as an extension of the given element.
 * If omitted, @see {HTMLElement} is being used. Usage:
 *
 * `@extends('a')`
 *
 * That extends an @see @{HTMLAnchorElement} and hence inherits all given properties and behaviors.
 *
 * @param useShadow     set to true
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
