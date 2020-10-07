import { Binding } from './binding.class';
import { IBindingHandler } from './handlers/ibindinghandler.interface';
import { CheckedBindingHandler } from './handlers/checkedbindinghandler.class';
import { ValueBindingHandler } from './handlers/valuebindinghandler.class';
import { TextBindingHandler } from './handlers/textbindinghandler.class';
import { DefaultBindingHandler } from './handlers/defaultbindinghandler.class';
import { ModelState } from './modelstate.class';
import { LifeCycle, BaseComponent } from '@nyaf/lib';
import { VisibilityBindingHandler } from './handlers/visibilitybindinghandler.class';
import { DisplayBindingHandler } from './handlers/displaybindinghandler.class';
import { ValidatorBinding } from './validatorbinding.class';
import { ViewUpdate } from '../interfaces/viewupdate.interface';
import { MinLength, MaxLength, Pattern, Compare, Range, Email, Required } from '..';
import { Custom } from '../decorators/forms/val-custom.decorator';

const withShadow = Symbol.for('withShadow');

/**
 * The modelbinder serves two purposes:
 * First, the bi-directional data binding. Second, the converting of validation decorators into validation instructions.
 *
 * The bi-directional binding is uni-directional if the element doesn't support user input. That means, you can bind
 * any element. The binding is based on a {@link Proxy} class and requires ES2015 natively.
 *
 * The binding two a model requires the decorator {@link Viewmodel}. Here you define the type for binding.
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
 * For example, the * {@link ValueBindingHandler} has the name "value" and reads a value from {@link HTMLInputElement} 's `value` property.
 * It also contains an event listener, that supervises the `input` event. Binders for text may not have an event listener and hence bind
 * just uni-directional.
 *
 * If you need specific binders for custom elements, just create one by implementing the {@link IBindingHandler} interface.
 *
 * ```
 * class MyHandler implements IBindingHandler {
 *   // your code here
 * }
 * ```
 * This definition must be added to the local modelbinder instance. The decorator {@link @ViewModel} creates a property `model`,
 * that provides an instance of {@link ModelBinder,} initialized and bound to the current component. In the component, it's recommended
 * to do this in the Lifecycle.Load step, you can add your custom handler:
 *
 * ```
 * @ViewModel(UserModel, { handlers: { 'custom': new CustomHandler() } })
 * ```
 *
 * The `model` property is enforced by the {@link IModel<VM>} interface. That's for typing, the actual value is created at
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
  private subscriptions: {
    key: string | number | symbol;
    cb: (key: string) => void;
  }[] = [];
  public handlers: {
    [property: string]: IBindingHandler;
  } = {};
  // private validators: {
  //   [property: string]: Function;
  // } = {};

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
    mbInstance.handlers['visibility'] = new VisibilityBindingHandler();
    mbInstance.handlers['display'] = new DisplayBindingHandler();
    // mbInstance.validators['Required'] = new Required();
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
    const isShadowed = !!component.constructor[withShadow];
    mbInstance.scope = modelInstance;
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as BaseComponent).__uniqueId__) {
        // this is the single binder
        const elements = isShadowed ? component.shadowRoot.querySelectorAll('[n-bind]') : component.querySelectorAll('[n-bind]');
        // loop all elements with n-bind
        elements.forEach((el: HTMLElement) => {
          let expressionParts: string[];
          if ('true' === el.getAttribute('n-bind')) {
            // an empty n-bind is an indicator that we use attribute binding for multiple bindings
            // the bind<>() function creates something like "n-bind:...." while the rest is as usually
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
              // check for validator (val<T>())
              const toVal = Array.from(el.attributes).filter(a => a.value.startsWith('n-val'));
              if (toVal.length > 0) {
                // handle validations
                toVal.forEach(attrBind => {
                  // `n-val:${sourceProperty}:${Validator}:${BindingInstruction}`
                  expressionParts = attrBind.value.split(':');
                  // scopeKey is the property (email, userName, ...)
                  // Decoratorkeys all that apply (Required, Email, MaxLength) to that application
                  const [, scopeKey, decoratorKey, binderKey] = expressionParts;
                  // bind the model to validation action
                  const binding = new ValidatorBinding(scopeKey, binderKey, mbInstance, decoratorKey.toLowerCase(), el);
                  mbInstance.subscribe(scopeKey, (key: string) => {
                    binding.value = modelInstance[`__isValid__${decoratorKey}__${key}`];
                  });
                  // bind the error messages to target element
                  ModelBinder.setBinding(modelInstance, mbInstance, el, scopeKey?.trim(), 'innerText', `err__${decoratorKey}`, 'innerText');
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
            this.createValidationModel(modelInstance, mbInstance, Required.internal, p);
            this.createValidationModel(modelInstance, mbInstance, Email.internal, p);
            this.createValidationModel(modelInstance, mbInstance, MinLength.internal, p);
            this.createValidationModel(modelInstance, mbInstance, MaxLength.internal, p);
            this.createValidationModel(modelInstance, mbInstance, Pattern.internal, p);
            this.createValidationModel(modelInstance, mbInstance, Range.internal, p);
            this.createValidationModel(modelInstance, mbInstance, Compare.internal, p);
            this.createValidationModel(modelInstance, mbInstance, Custom.internal, p);
          });

        Object.keys(modelInstance).forEach(prop => mbInstance.notify(prop));
      }

    });
    return mbInstance;
  }

  private static createValidationModel(modelInstance: any, mbInstance: ModelBinder<any>, type: string, p: string): void {
    const hasValidator = modelInstance[`__has__${type}__${p}`];
    const errValidator = modelInstance[`__err__${type}__${p}`];
    if (!hasValidator) { return; }
    if (!mbInstance.state) {
      mbInstance.state = {
        isValid: true,
        state: {},
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
          mbInstance.state.validators[p].type[type.toLowerCase()] = hasValidator;
          mbInstance.state.validators[p].error[type.toLowerCase()] = errValidator;
          mbInstance.state.validators[p].isValid[type.toLowerCase()] = true;
        }
      }
    }
  }

  public static initupdates(component: BaseComponent, updatesMap: ViewUpdate<any, BaseComponent>[]): void {
    let mbInstance = ModelBinder._instanceStore.get(component);
    if (!mbInstance) {
      mbInstance = ModelBinder.initialize(component);
    }

    // Look for @Viewmodel decorator
    const model = component['model'];
    if (!model) {
      throw new Error('@ViewModel decorator missing or not before @ViewUpdates decorator.');
    }
    const isShadowed = !!component.constructor[withShadow];
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      updatesMap.forEach((update) => {
        const { selector, property, binder, target } = update;
        const bindElement = component.querySelector(selector);
        const decoratorKey = '';
        ModelBinder.setBinding(
          model,
          mbInstance,
          component,
          target,
          binder.constructor.name,
          decoratorKey,
          property.toString());
      });
    });
  }

  private static setBinding(modelInstance: any, mbInstance: ModelBinder<any>, el: HTMLElement, scopeKey: string, bindingHandler: string, decoratorKey?: string, prop?: string) {
    // decorator bindings
    if (decoratorKey && prop) {
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
