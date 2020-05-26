import { ModelBinder } from '../modelbinder/modelbinder.class';

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
  Object.defineProperty(target, `__modelbinder__`, {
    writable: true,
    enumerable: false,
    configurable: false
  });
  if (!target.prototype) {
    throw new Error('Decorator must be run on an instanciable component.');
  }
  Object.defineProperty(target.prototype, 'model', {
    get: function () {
      if (!target.__modelbinder__) {
        target.__modelbinder__ = ModelBinder.initialize(this); // the actual component
      }
      return target.__modelbinder__;
    }
  });
}
