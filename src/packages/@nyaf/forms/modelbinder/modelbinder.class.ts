import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { CheckedBindingHandler } from './handlers/checkedbindinghandler.class';
import { ValueBindingHandler } from './handlers/valuebindinghandler.class';
import { TextBindingHandler } from './handlers/textbindinghandler.class';
import { DefaultBindingHandler } from './handlers/defaultbindinghandler.class';
import { VisibilityForValidationBindingHandler } from './handlers/visibilitybindinghandler.class';
import { ModelState } from './modelstate.class';
import { LifeCycle, BaseComponent } from '@nyaf/lib';
import { isBoolean } from 'util';

/**
 * The modelbinder serves two purposes:
 * First, the bi-directional data binding. Second, the converting of validation decorators into validation instructions.
 *
 * The bi-directional binding is uni-directional if the element doesn't support user input. That means, you can bind
 * any element. The binding is based on a @see Proxy class and requires ES2015 natively.
 *
 * The binding two a model requires the decorator @see Viewmodel. Here you define the type for binding.
 *
 * ```
 * @ViewModel(UserModel)
 * export class Component extends BaseComponent<{}> implements IModel<UserModel>
 * ```
 *
 * At any part of your component you can now access a real object that is being synhcronized:
 *
 * ```
 * model: ModelBinder<UserModel>;
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
 * @ViewModel(UserModel, { handlers: { 'custom': new CustomHandler() } })
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
  public _scopeProxy: ProxyConstructor;
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
    mbInstance.handlers['default'] = new DefaultBindingHandler();
    // internal, not exported
    mbInstance.handlers['visibility'] = new VisibilityForValidationBindingHandler();
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
    const isShadowed = !!component.constructor['withShadow'];
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as BaseComponent).__uniqueId__) {
        // this is the single binder
        const elements = isShadowed ? component.shadowRoot.querySelectorAll('[n-bind]') : component.querySelectorAll('[n-bind]');
        mbInstance.scope = modelInstance;
        // loop all elements with n-bind
        elements.forEach((el: HTMLElement) => {
          let expressionParts: string[];
          if ('true' === el.getAttribute('n-bind')) {
            // an empty n-bind is an indicator that we use attribute binding for multiple bindings
            // the bind<>() function creates something like "n-bind:...." while the rest is as usualy
            const toBind = Array.from(el.attributes).filter(a => a.value.startsWith('n-bind'));
            toBind.forEach(attrBind => {
              // `n-bind:${sourceProperty}:${realTarget}:`
              expressionParts = attrBind.value.split(':');
              const [, scopeKey, handlerClass, decoratorKey] = expressionParts;
              const bindingHandler = Object.keys(mbInstance.handlers).filter(k => mbInstance.handlers[k].constructor.name === handlerClass).shift();
              ModelBinder.setBinding(modelInstance, mbInstance, el, scopeKey?.trim(), bindingHandler, decoratorKey?.trim(), attrBind.name);
            });
          } else {
            expressionParts = el.getAttribute('n-bind').split(':');
            if (expressionParts.length >= 2) {
              const toVal = Array.from(el.attributes).filter(a => a.value.startsWith('n-val'));
              if (toVal.length > 0) {
                console.log('val ', toVal);
                toVal.forEach(attrBind => {
                  // `n-val:${sourceProperty}:${Deco}`
                  expressionParts = attrBind.value.split(':');
                  const [, scopeKey, decoratorKey] = expressionParts;
                  const binding = new Binding(decoratorKey, 'visibility', mbInstance, el);
                  binding.bind(scopeKey);
                  ModelBinder.setBinding(modelInstance, mbInstance, el, scopeKey?.trim(), 'innerText', `err${decoratorKey}`);
                });
              } else {
                const [bindingHandler, scopeKey, decoratorKey] = expressionParts;
                ModelBinder.setBinding(modelInstance, mbInstance, el, scopeKey?.trim(), bindingHandler?.trim(), decoratorKey?.trim());
              }
            }
            if (expressionParts.length === 1) {
              throw new Error('[n-bind] is not properly formatted. Requires at least two parts: n-bind="targetProperty: sourceProperty". Alternatively leave empty and and attribute binders using {bind<T>()} instructions.');
            }
          }
        });
        // register the validators for binding
        Object.keys(modelInstance)
          .forEach(p => {
            const hasValidator = modelInstance[`__hasRequired__${p}`];
            const errValidator = modelInstance[`__errRequired__${p}`];
            if (!mbInstance.state) {
              mbInstance.state = {
                isValid: true,
                state: {
                  touched: false,
                  pristine: false,
                  dirty: false
                },
                validators: {}
              };
            } else {
              if (hasValidator) {
                if (!mbInstance.state.validators) {
                  mbInstance.state.validators = {};
                }
                if (!mbInstance.state.validators[p]) {
                  mbInstance.state.validators[p] = {
                    type: {},
                    error: {},
                    isValid: {}
                  };
                } else {
                  mbInstance.state.validators[p].type['required'] = hasValidator;
                  mbInstance.state.validators[p].error['required'] = errValidator;
                  mbInstance.state.validators[p].isValid['required'] = true;
                }
              }
            }
            // Add a binder event and check the conditions
            mbInstance.subscribe(p, (key: string) => {
              if (mbInstance.state.validators[p]) {
                const value = modelInstance[key];
                if (mbInstance.state.validators[p].type['required']) {
                  mbInstance.state.validators[p].isValid['required'] = !!value;
                }
              }
            });
          });

        Object.keys(modelInstance).forEach(prop => mbInstance.notify(prop));
      }

    });
    return mbInstance;
  }

  private static setBinding(modelInstance: any, mbInstance: ModelBinder<any>, el: HTMLElement, scopeKey: string, bindingHandler: string, decoratorKey?: string, prop?: string) {
    // decorator bindings
    if (decoratorKey) {
      // key is: display.text or display.desc
      const decoratorProp = `__${decoratorKey}__${scopeKey}`;
      if (modelInstance.constructor.prototype[decoratorProp]) {
        const binding = new Binding(decoratorProp, bindingHandler, mbInstance, el);
        binding.bind(prop);
        // no value assign as all decorators are readonly
      }
    } else {
      // property bindings
      if (modelInstance.hasOwnProperty(scopeKey)) {
        const binding = new Binding(scopeKey, bindingHandler, mbInstance, el);
        binding.bind(prop);
        binding.value = modelInstance[scopeKey];
      }
    }
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
  public set scope(scope: VM) {
    this._scopeProxy = new Proxy(scope, {
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
  }

  /**
   * Returns the scope's proxy instance, so changes to properties are pushed to binders.
   */
  public get scope(): VM {
    return this._scopeProxy as unknown as VM;
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
