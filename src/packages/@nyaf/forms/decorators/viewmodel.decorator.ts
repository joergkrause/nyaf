type Type<T> = new (...args: any[]) => T;

/**
 * The ViewModel decorator.
 *
 * This decorator defines the model for a component. It's a class decorator.
 *
 */
export function ViewModel<T extends {}>(model: Type<T>) {

  function viewModelInternal(target: Object): void {
    viewModelInternalSetup<T>(target, model);
  }

  // return the decorator
  return viewModelInternal;
}

export function viewModelInternalSetup<T extends {}>(target: any, modelType: Type<T>) {
  // create a helper property to transport a meta data value
  // this is an implicit property not available from user code, it's just to support the forms services
  // the value is the constructor
  Object.defineProperty(target, `__model__`, {
    value: modelType,
    enumerable: false,
    configurable: false
  });
}
