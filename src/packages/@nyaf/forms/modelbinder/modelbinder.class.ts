import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { CheckedBindingHandler } from './checkedbindinghandler.class';
import { ValueBindingHandler } from './valuebindinghandler.class';
import { TextBindingHandler } from './textbindinghandler.class';

/**
 * The modelbinder servers two purposes:
 * First, the bi-directional data binding, Second, the converting of validation decorators into validation instrcutions.
 *
 * The bi-directional binding is uni-directional if the element doesn't support user input. That means, you can bind
 * any element. The binding is based on a @see Proxy class and requires ES2015 natively.
 *
 * The binding two a model requires the decorator @see Viewmodel. Here you define the type for binding.
 *
 * ```
 * @ViewModel(UserModel)
 * ```
 *
 * In the @see LifeCycle callback you wait for @see LifeCycle.Load. Here you place the initializer that connects the form to the binder:
 *
 * ```
 * ModelBinder.initialize(this)
 * ```
 *
 * At any part of your component you can now assign a real object that is being synhcronized:
 *
 * ```
 * const modelInstance: UserModel = new UserModel();
 * ModelBinder.setScope(modelInstance);
 * ```
 *
 * In the form you define the binding with the property `n-bind` like this:
 *
 * ```
 * <input type="text" n-bind="value: Name" ... />
 * ```
 *
 * The property has two parts:
 *
 * 1. The HTML property the value binds to (in the example: `value`).
 * 2. The model property which is connected (in the example: *Name*).
 *
 * The @nyaf/forms library provides few binder functions, that consists of a name (the property name) and a binder logic.
 * For example, the * @see ValueBindingHandler has the name "value" and reads a value from @see HTMLInputElement 's `value` property.
 * It also contains an event listener, that supervises the `input` event. Binders for text may not have an event listener and hence bind
 * just uni-directional.
 *
 * If you need specific binders for custom elements, just create one by implementing the @see IBindingHandler interface.
 *
 *
 * ```
 * class MyHandler implements IBindingHandler {
 *   // your code here
 * }
 *
 * ModelBinder.handlers['custom', new MyHandler()];
 * ```
 *
 * In the form you can now bind to your custom property of your custom web component.
 *
 * ```
 * <app-myinput n-bind="custom: Name" ... />
 * ```
 *
 */
export class ModelBinder {
  static scope: ProxyConstructor;
  static subscriptions: {
    key: string;
    cb: () => void;
  }[] = [];
  static handlers: {
    [property: string]: IBindingHandler;
  } = {};

  /**
   * Add custom binders to bind non-trivial properties.
   *
   * @param prop Handler identifier, used in forms in `n-bind="prop: Value"`.
   * @param item The instance of the actual binding handler.
   */
  public static addHandler(prop: string, item: IBindingHandler) {
    ModelBinder.handlers[prop] = item;
  }
  /**
   * Initialize a binder for the current form. This is global and you can bind only one form at a time.
   *
   * @param component The web component this binder is currently attached to.
   */
  public static initialize(component: HTMLElement) {
    ModelBinder.handlers['value'] = new ValueBindingHandler();
    ModelBinder.handlers['innerText'] = new TextBindingHandler();
    ModelBinder.handlers['checked'] = new CheckedBindingHandler();
    // Look for @Viewmodel decorator
    const modelInstance = new component.constructor['__model__']();
    ModelBinder.setScope(modelInstance);
    const elements = component.querySelectorAll('[n-bind]');
    elements.forEach((el: HTMLElement) => {
      const expressionParts = el.getAttribute('n-bind').split(':');
      if (expressionParts.length < 2) {
        throw new Error('[n-bind] not properly formatted. Requires at least two parts: n-bind="targetProperty: sourceProperty".');
      }
      const bindingHandler = expressionParts[0].trim();
      const scopeKey = expressionParts[1].trim();
      if (modelInstance.hasOwnProperty(scopeKey)) {
        // TODO: Implement extensible validation
        // if (expressionParts.length === 3) {
        // 	const validator = expressionParts[2].trim();
        // 	if (bindingHandler === 'value') {
        // 		el.setAttribute(validator.toLowerCase(), validator.toLowerCase());
        // 	}
        // 	if (bindingHandler === 'innerText') {
        // 		el.textContent = `__${validator}__msg__${scopeKey}__`;
        // 	}
        // }
        const binding = new Binding(scopeKey, bindingHandler, el);
        binding.bind();
      }
    });
  }
  public static setScope(scope: {}): void {
    const p = new Proxy(scope, {
      get: (target: any, key: string, receiver: ProxyConstructor) => {
        return target[key];
      },
      set: (target: any, key: string, newValue: any): boolean => {
        const value = target[key];
        const shouldNotify = value !== newValue;
        target[key] = newValue;
        if (shouldNotify) {
          ModelBinder.notify(key);
        }
        ;
        return shouldNotify;
      }
    });
    ModelBinder.scope = p;
    Object.keys(scope).forEach(prop => ModelBinder.notify(prop));
  }
  static subscribe(key: string, cb: () => void): void {
    ModelBinder.subscriptions.push({
      key,
      cb
    });
  }
  private static notify(key: string): void {
    const subscriptions = ModelBinder.subscriptions.filter(subscription => subscription.key === key);
    subscriptions.forEach(subscription => {
      subscription.cb();
    });
  }
}