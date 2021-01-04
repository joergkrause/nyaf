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

const treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_COMMENT,
  {
    acceptNode: function (node) {
      if (node.textContent.indexOf('#n-bind=') > 0) {
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  },
  false
);

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
  private changeEvents: {
    key: string | number | symbol;
    cb: (state: ModelState<VM>) => void;
  }[] = [];
  public handlers: {
    [property: string]: IBindingHandler;
  } = {};
  private handlerRetrieveFunc: (bindingHandler: string, el: HTMLElement | Text) => string;

  constructor(handler?: { [key: string]: IBindingHandler }) {
    this.handlers['value'] = new ValueBindingHandler();
    this.handlers['innerText'] = new TextBindingHandler();
    this.handlers['textContent'] = new TextBindingHandler();
    this.handlers['checked'] = new CheckedBindingHandler();
    this.handlers['default'] = new DefaultBindingHandler();
    this.handlers['visibility'] = new VisibilityBindingHandler();
    this.handlers['display'] = new DisplayBindingHandler();
    if (handler) {
      Object.assign(this.handlers, handler);
    }
    this.handlerRetrieveFunc = (bindingHandler: string, el: HTMLElement | Text) => {
      let handlerKey = Object.keys(this.handlers).filter(k => this.handlers[k].constructor.name === bindingHandler || k === bindingHandler).shift();
      if (!handlerKey) {
        // fallback to defaults
        switch (el.constructor.name) {
          case 'HTMLInputELement':
            handlerKey = 'value';
            break;
          case 'Text':
            handlerKey = 'innerText';
            break;
          default:
            handlerKey = 'innerText';
            break;
        }
      }
      return handlerKey;
    };
  }

  /**
   * Initialize a binder for the current form. This is global and you can bind only one form at a time. Add custom binders to bind non-trivial properties.
   * Usually, you shoudn't call this directly. It's public because it's being called from the @ViewModel decorator. The decorators adds a hidden property
   * to store the binder instance directly in the component.
   *
   * @param component The web component this binder is currently attached to.
   * @param handler Handler identifier, used in forms in `n-bind="prop: Value"`.
   */
  public static initialize(component: BaseComponent, handler?: { [key: string]: IBindingHandler }, refresh?: ModelBinder<any>): ModelBinder<any> {
    const mbInstance = refresh ?? new ModelBinder(handler);
    ModelBinder._instanceStore.set(component, mbInstance);
    // Look for @Viewmodel decorator
    const modelInstanceConstructorHelper: any = component.constructor['__model__ctor__'];
    const modelInstanceConstructorFactory: Function = component.constructor['__model__factory__'];
    // in case we can't set properties in the model, because the model is generated by a tool (such as Nswag), the decorator might provide an initialisation instruction
    const modelSurrogateInstance = new component.constructor['__model__'](modelInstanceConstructorHelper);
    if (modelInstanceConstructorFactory) {
      modelInstanceConstructorFactory(modelSurrogateInstance);
    }
    const isShadowed = !!component.constructor[withShadow];
    // TODO: Handle global isValid
    mbInstance.scope = modelSurrogateInstance;
    // The proxy cannot see the hidden props. Amond these, we just need to work with the validation
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as BaseComponent).__uniqueId__) {
        // this is the single binder
        const elements = isShadowed ? component.shadowRoot.querySelectorAll('[n-bind]') : component.querySelectorAll('[n-bind]');
        // loop all elements with n-bind
        elements.forEach((el: HTMLElement) => {
          let expressionParts: string[];
          // an empty n-bind is an indicator that we use attribute binding for multiple bindings
          if ('true' === el.getAttribute('n-bind')) {
            const toVal = Array.from(el.attributes).filter(a => a.value.startsWith('n-val'));
            if (toVal.length > 0) {
              ModelBinder.setValidationBinder(mbInstance, toVal, expressionParts, el, modelSurrogateInstance);
            }
            const toSum = Array.from(el.attributes).filter(a => a.value.startsWith('n-sum'));
            if (toSum.length === 1) {
              ModelBinder.setValidationSummary(mbInstance, expressionParts, el, modelSurrogateInstance);
            }
            const toBind = Array.from(el.attributes).filter(a => a.value.startsWith('n-bind'));
            toBind.forEach(attrBind => {
              expressionParts = attrBind.value.split(':');
              const [, modelProperty, bindingHandler, , decoratorKey] = expressionParts;
              const handlerKey = mbInstance.handlerRetrieveFunc(bindingHandler, el);
              ModelBinder.setAttributeBinder(mbInstance, el, modelProperty?.trim(), handlerKey, attrBind.name, decoratorKey?.trim());
            });
          } else {
            // here we have just one n-bind and it can be a regular binding, a validation, or a summary (mutually exclusive)
            expressionParts = el.getAttribute('n-bind').split(':');
            if (expressionParts.length >= 2) {
              // check for validator (val<T>())
              const toVal = Array.from(el.attributes).filter(a => a.value.startsWith('n-val'));
              if (toVal.length > 0) {
                ModelBinder.setValidationBinder(mbInstance, toVal, expressionParts, el, modelSurrogateInstance);
              }
              const toSum = Array.from(el.attributes).filter(a => a.value.startsWith('n-sum'));
              if (toSum.length === 1) {
                ModelBinder.setValidationSummary(mbInstance, expressionParts, el, modelSurrogateInstance);
              }
              if (toVal.length === 0 && toSum.length === 0) {
                const [modelProperty, bindingHandler, targetProperty, decoratorKey] = expressionParts;
                const handlerKey = mbInstance.handlerRetrieveFunc(bindingHandler, el);
                ModelBinder.setAttributeBinder(mbInstance, el, modelProperty?.trim(), handlerKey, targetProperty, decoratorKey?.trim());
              }
            }
            if (expressionParts.length === 1) {
              throw new Error('[n-bind] is not properly formatted. Requires at least two parts: n-bind="sourceProperty:targetProperty". Alternatively leave empty and and attribute binders using {bind<T>()} instructions.');
            }
          }
        });
        const nodeList = [];
        while (treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
        if (nodeList.length) {
          nodeList.forEach((node: Comment) => {
            const data = (node as Comment).data.split('=')[1];
            const expressionParts = data.split(':');
            const [, modelProperty, decoratorKey] = expressionParts;
            const el = document.createTextNode(mbInstance.scope[`${decoratorKey}${modelProperty}`]);
            node.parentElement.appendChild(el);
          });
        }
        // register the validators for binding
        Object.keys(mbInstance.scope)
          .forEach((p: string) => {
            this.createValidationModel(mbInstance.scope, mbInstance, Required.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, Email.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, MinLength.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, MaxLength.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, Pattern.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, Range.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, Compare.internal, p);
            this.createValidationModel(mbInstance.scope, mbInstance, Custom.internal, p);
            mbInstance.notify(p);
          });
      }

    });
    return mbInstance;
  }

  private static setValidationBinder(mbInstance: ModelBinder<any>, toVal: Attr[], expressionParts: string[], el: HTMLElement, modelSurrogateInstance: {}) {
    const eventStore = [];
    // handle validations
    toVal.forEach(attrBind => {
      // `n-val:${sourceProperty}:${Validator}:${BindingInstruction}`
      expressionParts = attrBind.value.split(':');
      // modelProperty is the property (email, userName, ...)
      // Decoratorkeys all that apply (Required, Email, MaxLength) to that application (only one)
      const [, modelProperty, decoratorKey, bindingHandler] = expressionParts;
      const handlerKey = mbInstance.handlerRetrieveFunc(bindingHandler, el);
      // bind the model to validation action
      const binding = new ValidatorBinding(modelProperty, mbInstance.handlers[handlerKey], mbInstance, decoratorKey.toLowerCase(), el);
      mbInstance.subscribe(modelProperty, (currentProperty: string) => {
        // we need to use the surrogate because the Proxy doesn't keep the non-enumerable properties
        // the Proxy is current, while the surrogate still is in initial state, so we copy the enumarable properties
        Object.assign(modelSurrogateInstance, mbInstance.scope);
        // this is the validator decorator's validation function
        console.log(`Changed value ${currentProperty} of ${el.innerText} to `, modelSurrogateInstance[`__isValid__${decoratorKey}__${currentProperty}`]);
        binding.value = modelSurrogateInstance[`__isValid__${decoratorKey}__${currentProperty}`];
        mbInstance.changeEvents.filter(ce => ce.key === currentProperty).forEach(cee => cee.cb(mbInstance.state))
      });
      binding.bind(attrBind.name);
      eventStore.push({
        modelProperty,
        decoratorKey,
        binding
      });
    });
    // TODO: subscribe only once per modelProperty and split logic to different binders within the event
  }

  private static setValidationSummary(mbInstance: ModelBinder<any>, expressionParts: string[], el: HTMLElement, modelSurrogateInstance: {}) {
    const [bindingHandler] = expressionParts;
    // TODO: Implement
  }

  /**
   * @internal
   *
   * @param modelInstance
   * @param mbInstance
   * @param el
   * @param modelProperty The property of the view model we bind to. if a decoratorkey is provided, this defines where the decorator comes from and then we bind to the decorators value, not the model's property value
   * @param handlerKey The key of a handler, that is able to create a binding connection between a ui attribute (innerText, value, textContent, ...) in HTML and the model property
   * @param uiElementAttribute Usually the handlerKey defines a binding handler that knows how to bind the ui (what HTML tag attribute). In case of multiple bindings this must be specified
   * @param decoratorKey The name of the decorator and the key that is the property of the decorator. Some decorsators have multiple props, such ass "text", and "order" of the "Display" decorator. This is optional, if ommitted the viewmodel property value is used directly.
   */
  private static setAttributeBinder(mbInstance: ModelBinder<any>, el: HTMLElement, modelProperty: string, handlerKey: string, uiElementAttribute: string, decoratorKey?: string) {
    const modelInstance: any = mbInstance.scope;
    // decorator bindings
    if (decoratorKey) {
      // key is: display.text or display.desc, while the decorator is responsible to provide it's internally used replacements, such as "__displayText__"
      const modelPropertyWithDecorator = `${decoratorKey}${modelProperty}`;
      if (modelInstance.constructor.prototype[modelPropertyWithDecorator]) {
        const binding = new Binding(modelPropertyWithDecorator, handlerKey, mbInstance, el);
        binding.bind(uiElementAttribute);
        // no value assign as all UI decorators are readonly
      } else {
        throw new Error('Invalid decorator property accessor in a binding expression: Tried to pull "' + decoratorKey + '" but no such decorator was prsent on the model');
      }
    } else {
      // property bindings
      if (modelInstance.hasOwnProperty(modelProperty)) {
        const binding = new Binding(modelProperty, handlerKey, mbInstance, el);
        binding.bind(uiElementAttribute);
        binding.value = modelInstance[modelProperty];
      }
    }
  }


  public static createValidationModel(modelInstance: any, mbInstance: ModelBinder<any>, type: string, p: string): void {
    const hasValidator = modelInstance[`__has__${type}__${p}`];
    const errValidator = modelInstance[`__err__${type}__${p}`];
    const funcValidator = modelInstance[`__isValid__${type}__${p}`];
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
      }
      mbInstance.state.validators[p].type[type.toLowerCase()] = hasValidator;
      mbInstance.state.validators[p].error[type.toLowerCase()] = errValidator;
      mbInstance.state.validators[p].isValid[type.toLowerCase()] = funcValidator;
    }
    mbInstance.state.state[p] = {
      touched: false,
      pristine: true,
      dirty: false
    }
  }

  public static initUpdates(component: BaseComponent, updatesMap: ViewUpdate<any, BaseComponent>[]): void {
    let mbInstance = ModelBinder._instanceStore.get(component);
    if (!mbInstance) {
      mbInstance = ModelBinder.initialize(component);
    }
    // Look for @Viewmodel decorator
    const model = component['model'];
    if (!model) {
      throw new Error('@ViewModel decorator missing or not before @ViewUpdates decorator.');
    }
    mbInstance.scope = model;
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      if (e.detail == LifeCycle.Load) {
        updatesMap.forEach((update) => {
          const { selector, property, binder, target } = update;
          const bindElement = component.querySelector(selector);
          const decoratorKey = '';
          ModelBinder.setAttributeBinder(
            mbInstance,
            component,
            target as string,
            binder.constructor.name,
            decoratorKey,
            property.toString());
        });
      }
    });
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

  public change(property: string, cb: (state: ModelState<VM>) => void) {
    this.changeEvents.push({ key: property, cb });
  }

}
