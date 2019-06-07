import { objectExpression } from "@babel/types";

type Type<T> = new (...args: any[]) => T;

/**
 * The ViewModel decorator.
 *
 * This decorator defines the model for a component. It's a class decorator.
 *
 */
export function ViewModel<T extends {}>() {
  // the original decorator
  // tslint:disable-next-line:no-shadowed-variable
  const defaults: T = {} as T;
  function viewModelInternal(target: Object): void {
    viewModelInternalSetup<T>(target, defaults);
  };

  // return the decorator
  return viewModelInternal;
}

export function viewModelInternalSetup<T extends {}>(target: any, defaults: T) {
  // create a helper property to transport a meta data value
  Object.defineProperty(target, `model`, {
    value: defaults,
    enumerable: false,
    configurable: false
  });
}
