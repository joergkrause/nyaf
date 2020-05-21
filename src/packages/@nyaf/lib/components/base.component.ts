import { LifeCycle } from './lifecycle.enum';
import { isObject, isNumber, isBoolean, isArray } from 'util';
import { GlobalProvider } from '../lib/globalprovider';

/**
 * The structure that defines the state object.
 */
export interface ComponentData {
  [key: string]: any;
}

export interface IBaseComponent extends HTMLElement {
}

/**
 * Base class for components. Use in derived classes with a path to a template file, and additional setup steps callback.
 * Override 'render' method (mandatory) for event wiring and data/dom manipulation or creation (dynamic part).
 *
 * If the component shall show nothing or has temporarily nothing to render just return `null`.
 *
 * Components must be decorated with at least the @see {CustomElement} decorator. That defines the name is required to render properly.
 * Additional class decorators are available:
 *
 * * @see InjectService:  Injects a service class und a singleton instance becomes avaiable through the property `services`.
 *
 * After the render method has been called the first time the property `initialized` becomes `true`.
 * All properties can be bound, so any change will re-render the content. See @see {Properties} decorator.
 * If you use *jsx* in the render method you must import JSX function. This is same behavior as in React. It isn't React, though.
 *
 * https://www.mikedoesweb.com/2017/dynamic-super-classes-extends-in-es6/
 */
export abstract class BaseComponent<P extends ComponentData = {}> extends HTMLElement implements IBaseComponent {
  /**
   * Set by decorator @see {UseParentStyles}. If set, it copies styles to a shadowed component.
   * If not shadowed, it's being ignored. See @see {UseShadowDOM} decorator, too.
   */
  public static readonly useParentStyles: boolean;

  /**
   * A copy of the global styles statically set for all components. First access fills it in, than it's cached.
   */
  private static globalStyle: string;
  private static linkedStyles: HTMLLinkElement[] = [];
  /**
   * Set by decorator @see {UseShadowDOM}. A shadowed component is technically isolated.
   */
  public static readonly withShadow: boolean;

  /**
   * Set by decorator @see {CustomElement}. It's the element's name in CSS selector style.
   */
  public static readonly selector: string;

  /**
   * A shortcut to access elements after rendering that have `n-sel` attribute.
   * Example: `<button n-sel='bbb' />`
   * Access this element within the component easily like this `this.$['bbb']`.
   * If there are multiple definitions with same key an array is being delivered.
   */
  public get ['$'](): { [selectable: string]: HTMLElement | HTMLElement[] } {
    if ((<any>this.constructor).withShadow) {
      return this.shadowRoot['__$'];
    } else {
      return this['__$'];
    }
  }

  public get ['$$']() { return this.querySelector; }
  public get ['$$$']() { return this.querySelectorAll; }

  /**
   * Observe all registered attributes. The source field is set by the @see {Properties} decorator.
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
   * * first by an sync call of the @see LifeCycle method
   * * second by dispatching the 'onlifecycle' event. Use addEventListener('lifecycle', ...) to catch the event.
   * * third a property 'onLifecycle' is being called if a handler function is attached.
   */
  protected set lifeCycleState(lc: LifeCycle) {
    const parentWalk = (el: HTMLElement, evt: string) => {
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
    // sync lifecycle callback
    this.lifeCycle(lc);
    // for async apps also an event
    const lifeCycleEvent = new CustomEvent('lifecycle', {
      bubbles: true,
      cancelable: false,
      composed: false,
      detail: lc
    });
    this.dispatchEvent(lifeCycleEvent);
    // TODO: Duplicate of GlobalProvider event handler, simplify code
    if (this.getAttribute('onlifecycle')) {
      let evt = this.getAttribute('onlifecycle');
      const params = [];
      const match = evt.match(/^(\(?.\)?|.?)\s?=>\s?this\.([^(]*)\(([^)]*)?/);
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
  private _services: Map<string, any>;
  public isInitalized = false;
  public onlifecycle: Function;

  /**
   *
   * @param template The path to the file containing the HTML
   * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
   */
  constructor() {
    super();
    const defaultProperties = Object.assign({}, (<any>this.constructor).__proxyInitializer__);
    this._data = new Proxy(defaultProperties as P, this.proxyAttributeHandler);
    this.lifeCycleState = LifeCycle.Init;
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    if (this.constructor['useParentStyles'] && this.constructor['withShadow'] && !this.constructor['globalStyle']) {
      for (let i = 0; i < this.ownerDocument.styleSheets.length; i++) {
        const css: CSSStyleSheet = this.ownerDocument.styleSheets[i] as CSSStyleSheet;
        if (!css.rules || css.rules.length === 0 || css.rules[0].cssText.startsWith(':ignore')) {
          continue;
        }
        this.constructor['globalStyle'] += Object.keys(css.cssRules)
          .map(k => css.cssRules[k].cssText ?? ' ')
          .join(' ');
      }
    }
  }

  // track changes to properties accessed from code directly
  proxyAttributeHandler = {
    get: (obj: P, prop: string) => {
      try {
        if (this.attributes.getNamedItem(`__${prop}__obj__`) || (this[prop] !== undefined && isObject(this[prop]))) {
          return JSON.parse(this.getAttribute(prop));
        }
        if (this.attributes.getNamedItem(`__${prop}__bool__`) || (this[prop] !== undefined && isBoolean(this[prop]))) {
          return this.getAttribute(prop) === 'true';
        }
        if (this.attributes.getNamedItem(`__${prop}__num__`) || (this[prop] !== undefined && isNumber(this[prop]))) {
          return Number.parseFloat(this.getAttribute(prop));
        }
        return obj[prop];
      } catch (err) {
        console.error(`A complex property was not set properly: '${prop}'. Error: '${err}`);
      }
      return this.getAttribute(prop);
    },
    set: (obj: P, prop: string, value: any, receiver: any): boolean => {
      (<any>obj)[prop] = value;
      try {
        if (isObject(value)) {
          this.setAttribute(`__${prop}__obj__`, '');
          value = JSON.stringify(value);
        }
        if (isBoolean(value)) {
          this.setAttribute(`__${prop}__bool__`, '');
        }
        if (isNumber(value)) {
          this.setAttribute(`__${prop}__num__`, '');
        }
        this.setAttribute(prop, value);
        Promise.resolve();
      } catch (err) {
        console.error('A complex property was not set properly: ' + prop + '. Error: ' + err);
      }
      return true;
    }
  };

  // ability to send data to elements from main window
  private receiveMessage(event) {
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
   * Return the last state the life cycle has reached. This is being set immediately before the event @see {lifeCycle} is fired.
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
   * Returns the service's instance. Defined using the @see InjectService decorator. The decorator uses a local name for the custom service.
   * @param service The name of a registered service
   */
  protected services<S = any>(serviceId: string): S {
    return this._services.get(serviceId) as S;
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
   * Fires the @see LifeCycle.PreRender before and the @see LifeCycle.Load event after the content is being written.
   * The @see lifeCycle hook is called accordingly.
   */
  protected async setup(): Promise<void> {
    this.lifeCycleState = LifeCycle.PreRender;
    if ((<any>this.constructor).withShadow) {
      const template = document.createElement('template');
      template.innerHTML = await this.render();
      if (!this.shadowRoot || this.shadowRoot.mode === 'closed') {
        this.attachShadow({ mode: 'open' });
        if ((<any>this.constructor).useParentStyles && (<any>this.constructor).globalStyle) {
          // copy styles to shadow if shadowed and there is something to add
          const style = document.createElement('style');
          style.textContent = (<any>this.constructor).globalStyle;
          this.shadowRoot.appendChild(style);
        }
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setShortSelectables(this.shadowRoot);
      }
    } else {
      this.innerHTML = await this.render();
      this.setShortSelectables(this);
    }
    this.lifeCycleState = LifeCycle.Load;
  }

  private setShortSelectables(root: HTMLElement | ShadowRoot) {
    const selectables = root.querySelectorAll('[n-sel]');
    root['__$'] = {};
    if (selectables) {
      for (let i = 0; i < selectables.length; i++) {
        const name = selectables[i].getAttribute('n-sel');
        const value = selectables[i];
        if (root['__$'][name]) {
          root['__$'][name] = [];
          root['__$'][name].push(value);
        }
        root['__$'][name] = value;
      }
    }
  }

  /**
   * Change the state of the internal data object. If necessary, the component re-renders. Render can be suppressed.
   *
   * @param name Name of the value.
   * @param newValue The actual new value.
   * @param noRender Prevent the re-rendering. Used if multiple attributes are being written and a render process for each is not required.
   */
  public async setData(name: string, newValue: any, noRender = false): Promise<void> {
    this.lifeCycleState = LifeCycle.SetData;
    const rerender = this.data[name] !== newValue;
    (this.data as ComponentData)[name] = newValue;
    // something is new so we rerender
    if (rerender && !noRender) {
      await this.setup();
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
    this.dispose();
    this.lifeCycleState = LifeCycle.Disposed;
  }

  private adoptedCallback() {
    this.lifeCycleState = LifeCycle.Adopted;
  }

}
