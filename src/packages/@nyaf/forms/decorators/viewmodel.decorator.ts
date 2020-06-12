﻿import { ModelBinder } from '../modelbinder/modelbinder.class';
import { IBindingHandler } from '../modelbinder/ibindinghandler.interface';
import { BaseComponent } from '@nyaf/lib';

type Type<T> = new (...args: any[]) => T;

/**
 * This type allows various settings for the view. It's optional and all members are optional.
 * A standard view with the view model being build by own code and properties are instantiated, it's usually not required. However, if the model
 * is generated by a tool, such as NSwag, and the initialization steps are not part of the default ctor call, the viewmodel must be "enhanced".
 * There are two options:
 * 1. If the viewmodel has a constructor that requires parameters, use the @param ctor to deliver the parameters.
 * 2. If the viewmodel has an initialization function ofr nothing at all, use @param factory to create a factory. You get the current object and apply your changes.
 *
 * The thirs option is regarding handlers. Handlers define, which property is bound in which way. In case you need a special treatment for Date values,
 * create a Handler through implementing the @see IBindingHandler interface. It has two features: Listen for events and change value if the bound object changes.
 * You can skip the listener part to have an unidirectional binding. Internally there are three pre-defined handlers:
 *
 * 1. innerText: An unidirectional binder that writes text in any @see HTMLElement
 * 2. value: A binder that handles any kind of @see IHTMLInputElement ; this is bi-directional
 * 3. checkbox: Handles a value by accepting a `boolean` value and supports the `checked` property instead of `value`.
 *
 *
 *
 */
export interface IViewDecoratorOptions<T> {
  ctor?: Partial<T>;
  handler?: { [key: string]: IBindingHandler };
  factory?: (params: T) => void;
}

/**
 * The ViewModel decorator. Defines the `model` value in the component. Goes together with the @see IModel interface.
 *
 * This decorator defines the model for a component. It's a class decorator.
 *
 * For more information see @see IViewDecoratorOptions
 *
 *
 * @param model The model used to bind the component. It's one model per component.
 * @param options An optional set of handlers that handle custom data types while transferring values from elements to model and vice versa. Also option constructor support.
 */
export function ViewModel<T extends {}>(model: Type<T>, options?: IViewDecoratorOptions<T>) {

  function viewModelInternal(target: Object): void {
    viewModelInternalSetup<T>(target, model, options);
  }

  // return the decorator
  return viewModelInternal;
}

function viewModelInternalSetup<T extends {}>(target: any, modelType: Type<T>, options?: IViewDecoratorOptions<T>) {
  // create a helper property to transport a meta data value
  // this is an implicit property not available from user code, it's just to support the forms services
  // the value is the constructor
  Object.defineProperty(target, `__model__`, {
    value: modelType,
    enumerable: false,
    configurable: false
  });
  if (options?.ctor) {
    Object.defineProperty(target, `__model__ctor__`, {
      value: options.ctor,
      enumerable: false,
      configurable: false
    });
  }
  if (options?.factory) {
    Object.defineProperty(target, `__model__factory__`, {
      value: options.factory,
      enumerable: false,
      configurable: false
    });
  }
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
        target.__modelbinder__[$this.__uniqueId__] = ModelBinder.initialize(this, options?.handler); // the actual component
      }
      return target.__modelbinder__[$this.__uniqueId__];
    }
  });
}
