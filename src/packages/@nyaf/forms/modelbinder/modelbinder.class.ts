import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { CheckedBindingHandler } from './checkedbindinghandler.class';
import { ValueBindingHandler } from './valuebindinghandler.class';
import { TextBindingHandler } from './textbindinghandler.class';
import { ModelState } from './modelstate.class';
import { LifeCycle, BaseComponent } from '@nyaf/lib';

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
 * ```
 * class MyHandler implements IBindingHandler {
 *   // your code here
 * }
 * ```
 * This definition must be added to the local modelbinder instance. The decorator @see @ViewModel creates a property `model`,
 * that provides an instance of @see ModelBinder, initialized and bound to the current component. In the component, it's recommended
 * to do this in the Lifecycle.Load step, you can add your custom handler:
 *
 * ```
 * this.model.handlers['custom', new MyHandler()];
 * ```
 *
 * The `model` property is enforced by the @see IModel<VM> interface. That's for typing, the actual value is created at
 * runtime from the decorator code.
 *
 * In the form you can now bind to your custom property of your custom web component.
 *
 * ```
 * <app-myinput n-bind="custom: Name" ... />
 * ```
 *
 */
export class ModelBinder<VM extends object> {
  static _instanceStore = new Map<HTMLElement, ModelBinder<{}>>();
  public scope: ProxyConstructor;
  public state: ModelState<VM> = new ModelState();
  subscriptions: {
    key: string | number | symbol;
    cb: (key: string) => void;
  }[] = [];
  handlers: {
    [property: string]: IBindingHandler;
  } = {};

  /**
   * Initialize a binder for the current form. This is global and you can bind only one form at a time. Add custom binders to bind non-trivial properties.
   * Usually, you shoudn't call this directly. It's public because it's being called from the @ViewModel decorator. The decorators adds a hidden property
   * to store the binder instance directly in the component.
   *
   * @param component The web component this binder is currently attached to.
   * @param handler Handler identifier, used in forms in `n-bind="prop: Value"`.
   */
  public static initialize(component: BaseComponent, handler?: { [key: string]: IBindingHandler }): ModelBinder<any> {
    const mbInstance = new ModelBinder();
    mbInstance.handlers['value'] = new ValueBindingHandler();
    mbInstance.handlers['innerText'] = new TextBindingHandler();
    mbInstance.handlers['checked'] = new CheckedBindingHandler();
    if (handler) {
      Object.assign(mbInstance.handlers, handler);
    }
    ModelBinder._instanceStore.set(component, mbInstance);
    // Look for @Viewmodel decorator
    const modelInstanceConstructorHelper: any = component.constructor['__model__ctor__'];
    const modelInstanceConstructorFactory: Function = component.constructor['__model__factory__'];
    // in case we can't set properties in the model, because the model is generated by a tool (such as Nswag), the decorator might provide a initialisation instruction
    const modelInstance = new component.constructor['__model__'](modelInstanceConstructorHelper);
    if (modelInstanceConstructorFactory) {
      modelInstanceConstructorFactory(modelInstance);
    }
    console.log('mi', modelInstance);
    const isShadowed = !!component.constructor['withShadow'];

    component.addEventListener('lifecycle', (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as BaseComponent).__uniqueId__) {
        const elements = isShadowed ? component.shadowRoot.querySelectorAll('[n-bind]') : component.querySelectorAll('[n-bind]');
        mbInstance.setScope(modelInstance);
        elements.forEach((el: HTMLElement) => {
          const expressionParts = el.getAttribute('n-bind').split(':');
          if (expressionParts.length < 2) {
            throw new Error('[n-bind] not properly formatted. Requires at least two parts: n-bind="targetProperty: sourceProperty".');
          }
          const bindingHandler = expressionParts[0].trim();
          const scopeKey = expressionParts[1].trim();
          // decorator bindings
          if (expressionParts.length === 3) {
            const decoratorKey = expressionParts[2].trim();
            // key is: display.text or display.desc
            const decoratorProp = `__${decoratorKey}__${scopeKey}`;
            if (modelInstance.constructor.prototype[decoratorProp]) {
              const binding = new Binding(decoratorProp, bindingHandler, mbInstance, el);
              binding.bind();
              // no value assign as all decorators are readonly
            }
          } else {
            // property bindings
            if (modelInstance.hasOwnProperty(scopeKey)) {
              const binding = new Binding(scopeKey, bindingHandler, mbInstance, el);
              binding.bind();
              binding.value = modelInstance[scopeKey];
            }
          }
          // TODO: Look for validators and handle validation
        });
        Object.keys(modelInstance).forEach(prop => mbInstance.notify(prop));
      }
    });
    return mbInstance;
  }

  /**
   * Returns the Binder for a component. Each component has it's very own binder instance.
   * @param component The component this instance is assigned to
   */
  public static getInstance(component: HTMLElement) {
    return ModelBinder._instanceStore.get(component);
  }

  /**
   * Set the object (model) the component is bound to. This is a proxy that monitors changes and renders the bound elements using binders.
   * @param scope An object instance that is monitored for binding
   */
  public setScope<T = VM>(scope: VM): VM {
    this.scope = new Proxy(scope, {
      get: (target: any, key: string, receiver: ProxyConstructor) => {
        return target[key];
      },
      set: (target: any, key: string, newValue: any): boolean => {
        const value = target[key];
        const shouldNotify = value !== newValue;
        target[key] = newValue;
        if (shouldNotify) {
          this.notify(key);
        }
        return true;
      }
    });
    Object.keys(scope).forEach(prop => this.notify(prop));
    return this.getScope();
  }

  /**
   * Returns the scope, which is a Proxy, so changes to properties are pushed to binders.
   */
  public getScope(): VM {
    return this.scope as unknown as VM;
  }

  /**
   * Use this to subsribe to model changes. If it's bound to an input element this will fire for all assigned
   * bindings, which more convenient than listing for events directly. I's safe to assign the subscriber in
   * the contructor of a component.
   * @param key The name of the property; must be a member of the view model.
   * @param cb A callback being executed when the value changes.
   */
  public subscribe<T = VM>(key: keyof T, cb: (key: string) => void): void {
    this.subscriptions.push({
      key,
      cb
    });
  }

  private notify(key: string): void {
    const subscriptions = this.subscriptions.filter(subscription => subscription.key === key);
    subscriptions.forEach(subscription => {
      subscription.cb(key);
    });
  }
}
