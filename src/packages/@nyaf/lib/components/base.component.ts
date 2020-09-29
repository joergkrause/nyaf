import { LifeCycle } from './lifecycle.enum';
import { GlobalProvider } from '../code/globalprovider';
import { uuidv4, isObject, isNumber, isBoolean, isArray, isString } from '../code/utils';
import { IDirective } from '../types/common';
import { CTOR, CustomElement_Symbol_Selector, ShadowDOM_Symbol_WithShadow, UseParentStyles_Symbol, InjectServices_Symbol } from '../consts/decorator.props';

/**
 * The structure that defines the state object.
 */
export interface ComponentData {
  [key: string]: any;
}

export interface IBaseComponent extends HTMLElement {
  isInitalized: boolean;
  onlifecycle: Function;
  render(): Promise<string>;
  setData(name: string, newValue: any, noRender?: boolean): Promise<void>;
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
export abstract class BaseComponent<P extends ComponentData = {}> extends HTMLElement implements IBaseComponent {

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
    // <a><b></b></a>: Init A, Init B, Load B, Load A, Dispose B, Dispose A
    const parentWalk = (el: HTMLElement, evt: string): any => {
      if (!el.parentElement) {
        return null;
      }
      // only events attached to custom components matter here
      if (GlobalProvider.registeredElements.some(te => (<HTMLElement>el.parentElement).tagName === te)) {
        const target = el.parentElement[evt];
        if (target) {
          return el.parentElement;
        }
      }
      return parentWalk(el.parentElement, evt);
    };
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
    // TODO: Duplicate of GlobalProvider event handler, simplify code
    if (this.getAttribute('onlifecycle')) {
      let evt = this.getAttribute('onlifecycle');
      const params = [];
      const match = evt.match(/^(?:(\(?.+\)?|.?)\s?=>\s?)?.+\.([^(]*)((?:[^)]*)?)?/);
      if (match.length > 2) {
        evt = match[2];
        parent = parentWalk(this, evt);
        if (parent) {
          if (match[3] && match[3].indexOf(',') > 0) {
            params.push(...match[3].split(',').map(s => {
              const param = s.trim();
              if (param === 'true') { return true; }
              if (param === 'false') { return false; }
              if (!isNaN(+param)) { return +param; }
              return param;
            }).slice(1));
          }
          parent[evt].call(parent, lifeCycleEvent, ...params);
        }
      }
    }
  }

  private _lifeCycleState: LifeCycle;
  private _data: P;

  public isInitalized = false;
  public onlifecycle: Function;

  /**
   * The constructor checks the various decorator settings and calls initializer routines that
   * have been marked as ctor dependency.
   */
  constructor() {
    super();
    this.__uniqueId__ = uuidv4();
    const defaultProperties = Object.assign({}, (<any>this.constructor).__proxyInitializer__);
    this._data = new Proxy(defaultProperties as P, this.proxyAttributeHandler);
    this.lifeCycleState = LifeCycle.Init;
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    if (this.constructor[UseParentStyles_Symbol] && this.constructor[ShadowDOM_Symbol_WithShadow] && !this.constructor[globalStyle_Symbol]) {
      this.constructor[globalStyle_Symbol] = '';
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
        const css: StyleSheet = this.constructor[UseParentStyles_Symbol] as StyleSheet;
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

  // track changes to properties accessed from code directly
  proxyAttributeHandler = {
    get: (obj: P, prop: string) => {
      try {
        if (this.attributes.getNamedItem(`n-type-${prop}`) && this.attributes.getNamedItem(`n-type-${prop}`).value === 'object') {
          return JSON.parse(this.getAttribute(prop));
        }
        if (this.attributes.getNamedItem(`n-type-${prop}`) && this.attributes.getNamedItem(`n-type-${prop}`).value === 'boolean') {
          return this.getAttribute(prop) === 'true' || this.getAttribute(prop) === '!0';
        }
        if (this.attributes.getNamedItem(`n-type-${prop}`) && this.attributes.getNamedItem(`n-type-${prop}`).value === 'number') {
          return Number.parseFloat(this.getAttribute(prop));
        }
        if (this.attributes.getNamedItem(`n-type-${prop}`) && this.attributes.getNamedItem(`n-type-${prop}`).value === 'array') {
          return JSON.parse(this.attributes.getNamedItem(`n-type-${prop}-value`).value);
        }
        return obj[prop];
      } catch (err) {
        console.error(`A complex property was not get properly: '${prop}'. Error: '${err}`);
      }
      return this.getAttribute(prop);
    },
    set: (obj: P, prop: string, value: any, receiver: any): boolean => {
      (<any>obj)[prop] = value;
      try {
        if (isBoolean(value)) {
          this.setAttribute(`n-type-${prop}`, 'boolean');
        } else if (isNumber(value)) {
          this.setAttribute(`n-type-${prop}`, 'number');
        } else if (isArray(value) || (isString(value) && (value.match(/^\[.*\]$/) && isArray(JSON.parse(value))))) {
          // an array we observe too
          if (isArray(value)) {
            value = JSON.stringify(value);
          }
          this.setAttribute(`n-type-${prop}`, 'array');
          this.setAttribute(`n-type-${prop}-value`, value);
          (<any>obj)[prop] = new Proxy(JSON.parse(value), {
            get(target, innerProp: string) {
              const val = target[innerProp];
              if (typeof val === 'function') {
                if (['push', 'unshift'].includes(innerProp)) {
                  return function () {
                    return Array.prototype[innerProp].apply(target, arguments);
                  };
                }
                if (['pop'].includes(innerProp)) {
                  return function () {
                    const el = Array.prototype[innerProp].apply(target, arguments);
                    return el;
                  };
                }
                return val.bind(target);
              }
              return val;
            }
          });
        } else if (isObject(value)) {
          this.setAttribute(`n-type-${prop}`, 'object');
          value = JSON.stringify(value);
        }
        this.setAttribute(prop, value);
        Promise.resolve();
      } catch (err) {
        console.error('A complex property was not set properly: ' + prop + '. Error: ' + err);
      }
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
  public abstract async render(): Promise<string>;

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
  protected async setup(): Promise<void> {
    this.lifeCycleState = LifeCycle.PreRender;
    let $this: BaseComponent = null;
    if ((<any>this.constructor)[ShadowDOM_Symbol_WithShadow]) {
      if (!this.shadowRoot) {
        // first time call we create the shadow root
        this.attachShadow({ mode: 'open' });
        if ((<any>this.constructor)[UseParentStyles_Symbol] && (<any>this.constructor)[globalStyle_Symbol]) {
          // copy styles to shadow if shadowed and there is something to add
          const style = document.createElement('style');
          style.textContent = (<any>this.constructor)[globalStyle_Symbol];
          this.shadowRoot.appendChild(style);
        }
      } else {
        const hasStyle = (<any>this.constructor)[UseParentStyles_Symbol] ? 1 : 0;
        for (let index = this.shadowRoot.childNodes.length - 1; index >= hasStyle; index--) {
          this.shadowRoot.childNodes.item(index).remove();
        };
      }
      const template = document.createElement('template');
      template.innerHTML = await this.render();
      template.id = this.__uniqueId__;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      $this = this.shadowRoot as unknown as BaseComponent;
    } else {
      this.innerHTML = await this.render();
      $this = this;
    }
    // attach directives, if any
    if (GlobalProvider.registeredDirectives) {
      GlobalProvider.registeredDirectives.forEach((directive: IDirective, selector: string) => {
        $this.querySelectorAll<HTMLElement>(selector).forEach((hostElement) => {
          const d = new directive(hostElement);
        });
      });
    }
    const childLoaders: Array<any> = [];
    this.loadCycleDetector(this.childNodes, childLoaders);
    if (childLoaders.length > 0) {
      Promise.all(childLoaders).then(() => this.lifeCycleState = LifeCycle.Load);
    } else {
      this.lifeCycleState = LifeCycle.Load;
    }
  }

  // observe all web components of the first level and wait for lifecycle === load
  private loadCycleDetector(children: NodeListOf<ChildNode>, childLoaders: Array<any>) {
    children.forEach((childNode) => {
      if (childNode instanceof BaseComponent) {
        const p = new Promise<void>(resolve => {
          childNode.addEventListener('lifecycle', (e: CustomEvent) => {
            if (e.detail === LifeCycle.Load) {
              resolve();
            }
          });
        });
        childLoaders.push(p);
      } else {
        if (childNode.childNodes.length > 0) {
          this.loadCycleDetector(childNode.childNodes, childLoaders);
        }
      }
    });
  }


  /**
   * Change the state of the internal data object. If necessary, the component re-renders. Render can be suppressed.
   * Omit the @param noRender at it renders on change. Set to `true` to suppress entirely. Set to `false` to enforce explicitly.
   *
   * @param name Name of the property. Must be defined in the generic P to assure being observed.
   * @param newValue The actual new value.
   * @param noRender Prevent or enforce the re-rendering. Used if multiple attributes are being written and a render process for each is not required.
   */
  public async setData(name: keyof (P), newValue: any, noRender?: boolean): Promise<void> {
    const rerender = this.data[name] !== newValue;
    (this.data)[name] = newValue;
    // something is new so we rerender
    if (rerender && noRender === void 0) {
      this.lifeCycleState = LifeCycle.SetData;
      await this.setup();
    } else {
      if (noRender === false) {
        this.lifeCycleState = LifeCycle.SetData;
        await this.setup();
      }
    }
  }

  private async attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue !== newValue) {
      (this.data as ComponentData)[name] = newValue;
      if (this.isInitalized) {
        await this.setup();
      }
    }
  }

  private async connectedCallback() {
    this.lifeCycleState = LifeCycle.Connect;
    await this.setup();
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
