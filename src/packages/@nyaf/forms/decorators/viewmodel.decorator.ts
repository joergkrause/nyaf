import { ModelBinder } from '../modelbinder/modelbinder.class';
import { IBindingHandler } from '../modelbinder/ibindinghandler.interface';
import { BaseComponent } from '@nyaf/lib';

type Type<T> = new (...args: any[]) => T;

/**
 * The ViewModel decorator. Defines the `model` value in the component. Goes together with the @see IModel interface.
 *
 * This decorator defines the model for a component. It's a class decorator.
 * @param model The model used to bind the component. It's one model per component.
 * @param handler An optional set of handlers that handle custom data types while transferring values from elements to model and vice versa.
 */
export function ViewModel<T extends {}>(model: Type<T>, handler?: { [key: string]: IBindingHandler }) {

  function viewModelInternal(target: Object): void {
    viewModelInternalSetup<T>(target, model, handler);
  }

  // return the decorator
  return viewModelInternal;
}

function viewModelInternalSetup<T extends {}>(target: any, modelType: Type<T>, handler?: { [key: string]: IBindingHandler }) {
  // create a helper property to transport a meta data value
  // this is an implicit property not available from user code, it's just to support the forms services
  // the value is the constructor
  Object.defineProperty(target, `__model__`, {
    value: modelType,
    enumerable: false,
    configurable: false
  });
  if (!target.prototype) {
    throw new Error('Decorator must be run on an instanciable component.');
  }
  Object.defineProperty(target.prototype, `__modelbinder__`, {
    writable: true,
    enumerable: false,
    configurable: false
  });
  Object.defineProperty(target.prototype, 'model', {
    get: function () {
      if (!target.__modelbinder__) {
        target.__modelbinder__ = {};
      }
      const $this: BaseComponent = this as BaseComponent;
      if (!target.__modelbinder__[$this.__uniqueId__]) {
        target.__modelbinder__[$this.__uniqueId__] = ModelBinder.initialize(this, handler); // the actual component
      }
      return target.__modelbinder__[$this.__uniqueId__];
    }
  });
}
