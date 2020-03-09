import { LifeCycle } from './lifecycle.enum';
import { BasePComponent } from './base.p.component';

// TODO: Implement https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445

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

  /**
   * Set by decorator @see {UseShadowDOM}. A shadowed component is technically isolated.
   */
  public static readonly withShadow: boolean;

  /**
   * Set by decorator @see {CustomElement}. It's the element's name in CSS selector style.
   */
  public static readonly selector: string;

  /**
   * Observe all registered attributes. The source field is set by the @see {Properties} decorator.
   */
  protected static get observedAttributes() {
    console.log('Register attributes to observe:', (this as any).__observedAttributes__);
    return (this as any).__observedAttributes__;
  }

  /**
   * Declares that the render method has been called at least one times.
   */
  protected set lifeCycleState(lc: LifeCycle) {
    this._lifeCycleState = lc;
    this.lifeCycle(lc);
  }
  private _lifeCycleState: LifeCycle;
  private _data: P;
  private _services: Map<string, any>;
  private isInitalized = false;

  /**
   *
   * @param template The path to the file containing the HTML
   * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
   */
  constructor() {
    super();
    this._data = new Proxy((this as any).__proxyInitializer__ || {} as P, this.proxyAttributeHandler);
    this.lifeCycleState = LifeCycle.Init;
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    if (this.constructor['useParentStyles'] && this.constructor['withShadow'] && !this.constructor['globalStyle']) {
      // TODO make static
      for (let i = 0; i < this.ownerDocument.styleSheets.length; i++) {
        const css: CSSStyleSheet = this.ownerDocument.styleSheets[i] as CSSStyleSheet;
        if (css.rules[0].cssText.startsWith(':ignore')) {
          continue;
        }
        this.constructor['globalStyle'] = Object.keys(css.cssRules)
          .map(k => css.cssRules[k].cssText)
          .join('');
      }
    }
  }

  // track changes to properties accessed from code directly
  proxyAttributeHandler = {
    get: (obj: P, prop: string) => this.getAttribute(prop),
    set: (obj: P, prop: string, value: any, reeiver: any): boolean => {
      this.setAttribute(prop, value);
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
  public abstract render(): string;

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
   * Refresh the content after changes. Called automatically after changes of attrbibutes.
   */
  protected setup() {
    this.lifeCycleState = LifeCycle.PreRender;
    if ((<any>this.constructor).withShadow) {
      const template = document.createElement('template');
      template.innerHTML = this.render();
      if (!this.shadowRoot || this.shadowRoot.mode === 'closed') {
        this.attachShadow({ mode: 'open' });
        // copy styles to shadow if shadowed and there is something to add
        if ((<any>this.constructor).useParentStyles && (<any>this.constructor).globalStyle) {
          const style = document.createElement('style');
          style.textContent = (<any>this.constructor).globalStyle;
          this.shadowRoot.appendChild(style);
        }
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    } else {
      this.innerHTML = this.render();
    }
    this.lifeCycleState = LifeCycle.Load;
  }

  /**
   * Change the state of the internal data object. If necessary, the component re-renders.
   *
   * @param name Name of the value.
   * @param newValue The actual new value.
   */
  public setData(name: string, newValue: any): void {
    this.lifeCycleState = LifeCycle.SetData;
    const rerender = this.data[name] !== newValue;
    (this.data as ComponentData)[name] = newValue;
    // something is new so we rerender
    if (rerender) {
      this.setup();
    }
  }

  private attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue !== newValue) {
      (this.data as ComponentData)[name] = newValue;
      if (this.isInitalized) {
        this.setup();
      }
    }
  }

  private connectedCallback() {
    this.lifeCycleState = LifeCycle.Connect;
    this.setup();
    this.isInitalized = true;
  }

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
