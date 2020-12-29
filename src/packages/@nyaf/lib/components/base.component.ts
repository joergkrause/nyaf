import { LifeCycle } from './lifecycle.enum';
// import { GlobalProvider } from '../code/globalprovider';
import { uuidv4, isObject, isNumber, isBoolean, isArray, isString } from '../code/utils';
import { IDirective } from '../types/common';
import { CTOR, CustomElement_Symbol_Selector, ShadowDOM_Symbol_WithShadow, UseParentStyles_Symbol, InjectServices_Symbol, TheParentStyles_Symbol } from '../consts/decorator.props';

/**
 * The structure that defines the state object.
 */
export interface ComponentData {
  [key: string]: any;
}

const globalStyle_Symbol = Symbol();

/**
 * Base class for components. Use in derived classes with a path to a template file, and additional setup steps callback.
 * Override 'render' method (mandatory) for event wiring and data/dom manipulation or creation (dynamic part).
 *
 * If the component shall show nothing or has temporarily nothing to render just return `null`.
 *
 * Components must be decorated with at least the {@link {CustomElement}} decorator. That defines the name is required to render properly.
 * Additional class decorators are available:
 *
 * * {@link InjectService:}  Injects a service class und a singleton instance becomes avaiable through the property `services`.
 *
 * After the render method has been called the first time the property `initialized` becomes `true`.
 * All properties can be bound, so any change will re-render the content. See {@link {Properties}} decorator.
 * If you use *jsx* in the render method you must import JSX function. This is same behavior as in React. It isn't React, though.
 *
 * https://www.mikedoesweb.com/2017/dynamic-super-classes-extends-in-es6/
 */
export abstract class BaseComponent<P extends ComponentData = {}> extends HTMLElement {

  /**
   * A copy of the global styles statically set for all components. First access fills it in, then it's cached.
   */
  private static readonly [globalStyle_Symbol]: string;
  /**
   * Set by decorator {@link {UseShadowDOM}}. A shadowed component is technically isolated.
   */
  public static readonly [ShadowDOM_Symbol_WithShadow]: boolean;

  /**
   * Set by decorator {@link {CustomElement}}. It's the element's name in CSS selector style.
   */
  public static readonly [CustomElement_Symbol_Selector]: string;

  /**
   * Global directive registration that all component have access to.
   */
  public static registeredDirectives: Map<string, any>;

  /**
   * Observe all registered attributes. The source field is set by the {@link {Properties}} decorator.
   */
  protected static get observedAttributes(): string[] {
    if (isArray((this as any).__observedAttributes__)) {
      return ['onlifecycle', ...((this as any).__observedAttributes__ as Array<string>)];
    } else {
      return ['onlifecycle'];
    }
  }

  /**
   * Promote the lifecycle changes:
   * * first by a sync call of the {@link LifeCycle} method
   * * second by dispatching the 'onlifecycle' event. Use addEventListener('lifecycle', ...) to catch the event.
   * * third a property 'onLifecycle' is being called if a handler function is attached.
   */
  protected set lifeCycleState(lc: LifeCycle) {
    this._lifeCycleState = lc;
    // for async apps also an event
    const lifeCycleEvent = new CustomEvent('lifecycle', {
      bubbles: true,
      cancelable: false,
      composed: false,
      detail: lc
    });
    // handlers first, so they could cancel
    if (this.dispatchEvent(lifeCycleEvent)) {
      // sync lifecycle callback
      this.lifeCycle(lc);
    }
  }

  private _lifeCycleState: LifeCycle;
  private _data: P;    // Proxy to intercept access and get smart render
  private __data = {}; // hidden backup field

  public isInitalized = false;
  public onlifecycle: Function;

  /**
   * The constructor checks the various decorator settings and calls initializer routines that
   * have been marked as ctor dependency.
   */
  constructor() {
    super();
    this.__uniqueId__ = uuidv4();
    this.__data = Object.assign({}, (<any>this.constructor).__proxyInitializer__);
    this._data = new Proxy(this.__data as P, this.proxyAttributeHandler);
    this.lifeCycleState = LifeCycle.Init;
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    if (this.constructor[UseParentStyles_Symbol] && this.constructor[ShadowDOM_Symbol_WithShadow] && !this.constructor[globalStyle_Symbol]) {
      this.constructor[globalStyle_Symbol] = '';
      // decorator exists and has no parameter = use parent styles
      if (isBoolean(this.constructor[UseParentStyles_Symbol]) && this.constructor[UseParentStyles_Symbol] === true) {
        for (let i = 0; i < this.ownerDocument.styleSheets.length; i++) {
          const css: CSSStyleSheet = this.ownerDocument.styleSheets[i] as CSSStyleSheet;
          try {
            if (!css.rules || css.rules.length === 0 || css.rules[0].cssText.startsWith(':ignore')) {
              continue;
            }
            this.constructor[globalStyle_Symbol] += Object.keys(css.cssRules)
              .map(k => css.cssRules[k].cssText ?? ' ')
              .join(' ');
          } catch {
            console.warn('CORS violation while loading external style sheet. Adapt CORS or load from own server.');
          }
        }
      } else {
        const css: StyleSheet = this.constructor[TheParentStyles_Symbol] as StyleSheet;
        this.constructor[globalStyle_Symbol] += Object.keys(css)
          .map(k => css[k])
          .join(' ');
      }
    }
    // look for plugins that require ctor initialization, __ctor__ pattern
    if (CTOR in Object.getPrototypeOf(this) && isArray(this[CTOR])) {
      // this is an array in case multiple decorators which to be called
      (this[CTOR] as any[]).forEach((propName: string) => {
        this[propName] = this;
        // tslint:disable-next-line: no-unused-expression
        void this[propName];
      });
    }
  }

  __uniqueId__: any;

  proxyAttributeHandler = {
    get: (obj: P, prop: string) => {
      return this.__data[prop] ?? this.getAttribute(prop);
    },
    set: (obj: P, prop: string, value: any, receiver: any): boolean => {
      (<any>this).__data[prop] = value;
      // track changes to properties accessed from code directly, this triggers the change callback
      // this.setAttribute(prop, value);
      this.refresh();
      return true;
    }
  };

  // ability to send data to elements from main window (for Electron only)
  private receiveMessage(event: any) {
    if (event.data.type === 'setData' && (event.data.target === this.readAttribute('id', '') || this.localName === event.data.target)) {
      this.setData.apply(this, event.data.args);
    }
  }

  /**
   * Inform caller about reaching a state in life cycle.
   *
   * @param cycle The state reached.
   */
  protected lifeCycle(cycle: LifeCycle): void { }

  /**
   * Return the last state the life cycle has reached. This is being set immediately before the event {@link {lifeCycle}} is fired.
   */
  protected get currentLifeCycle() {
    return this._lifeCycleState;
  }

  /**
   * Implement and return a string with HTML. Ideally use JSX to create elements.
   */
  public abstract render(): any;

  /**
   * Clean up any resources here.
   */
  protected dispose(): void { }

  /**
   * Get the assigned state data the component holds internally.
   * @param key Optionally pull just one key from the dictionary.
   */
  protected get data(): P {
    return this._data;
  }

  /**
   * Returns the service's instance. Defined using the {@link InjectService} decorator. The decorator uses a local name for the custom service.
   * @param service The name of a registered service
   */
  protected services<S = any>(serviceId: string): S {
    if (!this[InjectServices_Symbol]) {
      console.error(`The service with id ${serviceId} was requested, but no setup could be found. Add @InjectService decorator on class level.`)
    }
    return this[InjectServices_Symbol].get(serviceId) as S;
  }

  /**
   * Call this method to dispatch a custom event. Returns the result of the event handler conform to default ECMAScript events.
   * @param name Dispatch a custom event bound to the current component.
   * @param data Some custom data and settings.
   */
  protected dispatch(name: string, data: CustomEventInit): boolean {
    const thisEvent = new CustomEvent(name + '_' + this.constructor.name, data);
    return super.dispatchEvent(thisEvent);
  }

  /**
   * Refresh the content after changes. Called automatically after changes of observed attributes.
   * Fires the {@link LifeCycle}.PreRender before and the {@link LifeCycle}.Load event after the content is being written.
   * The {@link lifeCycle} hook is called accordingly.
   */
  private setup(): void {
    this.lifeCycleState = LifeCycle.PreRender;
    const childLoaders: Array<any> = [];
    this.lifeCycleDetector(this.childNodes, childLoaders);
    let $this: BaseComponent = null;
    if ((<any>this.constructor)[ShadowDOM_Symbol_WithShadow] !== undefined) {
      if (!this.shadowRoot) {
        const mode = (<any>this.constructor)[ShadowDOM_Symbol_WithShadow] ? 'open' : 'closed';
        // first time call we create the shadow root
        this.attachShadow({ mode: mode });
        // any style to copy to shadow
        if ((<any>this.constructor)[globalStyle_Symbol]) {
          // copy styles to shadow if shadowed and there is something to add
          const style = document.createElement('style');
          style.textContent = (<any>this.constructor)[globalStyle_Symbol];
          (this.shadowRoot || this).appendChild(style);
        }
      } else {
        const hasStyle = (<any>this.constructor)[globalStyle_Symbol] ? 1 : 0;
        for (let index = this.shadowRoot.childNodes.length - 1; index >= hasStyle; index--) {
          (this.shadowRoot || this).childNodes.item(index).remove();
        }
      }
      $this = this.shadowRoot as unknown as BaseComponent || this;
    } else {
      $this = this;
    }
    this.refresh();
    if (childLoaders.length > 0) {
      Promise.all(childLoaders).then((state) => {
        this.lifeCycleState = LifeCycle.Render;
      });
    } else {
      this.lifeCycleState = LifeCycle.Render;
    }
  }

  /**
   * Refresh content after changes without re-creating the whole component
   */
  protected refresh(): void {
    this.lifeCycleState = LifeCycle.PreRender;
    const renderTree = this.render();
    const renderNewContent = isArray(renderTree) ? [...renderTree] : [renderTree];
    const target = (this.shadowRoot ?? this);
    let preservedStyle: ChildNode = null;
    if ((<any>this.constructor)[globalStyle_Symbol]) {
      // assume we have a style element and need to protect it
      preservedStyle = target.firstChild;
    }
    while (target.firstChild) {
      target.removeChild(target.lastChild);
    }
    if (preservedStyle) {
      target.prepend(preservedStyle);
    }
    if (renderNewContent) {
      renderNewContent.forEach((c: HTMLElement) => target.appendChild(c));
    }
    // attach directives, if any
    if (BaseComponent.registeredDirectives) {
      BaseComponent.registeredDirectives.forEach((directive: IDirective, selector: string) => {
        target.querySelectorAll<HTMLElement>(selector).forEach((hostElement) => {
          const d = new directive(hostElement);
          // TODO: Keep instance and dispose
        });
      });
    }
    this.lifeCycleState = LifeCycle.Load;
  }

  // observe all web components of the first level and wait for lifecycle === load
  private lifeCycleDetector(children: NodeListOf<ChildNode>, childLoaders: Array<any>) {
    children.forEach((childNode) => {
      if (childNode instanceof BaseComponent) {
        const p = new Promise<void>(resolve => {
          childNode.addEventListener('lifecycle', (e: CustomEvent) => {
            if (e.detail === LifeCycle.Render) {
              resolve(e.detail);
            }
          });
        });
        childLoaders.push(p);
      } else {
        if (childNode.childNodes.length > 0) {
          this.lifeCycleDetector(childNode.childNodes, childLoaders);
        }
      }
    });
  }

  /**
   * Change the state of the internal data object. If necessary, the component re-renders. Render can be enforced.
   * Omit the @param reRender to not enforce render. Observed attributes will still render.
   *
   * @param name Name of the property. Must be defined in the generic P to assure being observed.
   * @param newValue The actual new value.
   */
  public setData(name: keyof (P), newValue: any): void {
    this.lifeCycleState = LifeCycle.SetData;
    (this.data)[name] = newValue;
  }

  private attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (this._lifeCycleState === LifeCycle.SetData) {
      return;
    }
    if (oldValue !== newValue) {
      (this.data as ComponentData)[name] = newValue;
    }
  }

  private connectedCallback() {
    this.lifeCycleState = LifeCycle.Connect;
    this.setup();
    this.isInitalized = true;
  }

  /**
   * Returns the attributes value. If it doesn't exists it can return the given default. The attribute does not change, though.
   */
  protected readAttribute(name: string, defaultValue?: any) {
    return this.attributes[name] === undefined ? defaultValue : this.attributes[name].value;
  }

  private disconnectedCallback() {
    this.lifeCycleState = LifeCycle.Disconnect;
    // run internal disposings
    Object.keys(this).forEach(k => {
      if (k.startsWith('__dispose__')) {
        try {
          if (this[k]) {
            this[k]();
          }
        } catch (err) {
          // dispose function error

        }
      }
    });
    this.dispose();
    this.lifeCycleState = LifeCycle.Disposed;
  }

  private adoptedCallback() {
    this.lifeCycleState = LifeCycle.Adopted;
  }

}
