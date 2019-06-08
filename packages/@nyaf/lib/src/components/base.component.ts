import { LifeCycle } from './lifecycle.enum';

// TODO: Implement https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445

/**
 * The structure that defines the state object.
 */
export interface ComponentData {
  [key: string]: any;
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
 *
 */
export abstract class BaseComponent<P extends ComponentData = {}> extends HTMLElement {
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
   * Declares that the render method has been called at least one times.
   */
  protected set lifeCycleState(lc: LifeCycle) {
    this._lifeCycleState = lc;
    this.lifeCycle(lc);
  }
  private _lifeCycleState: LifeCycle;
  private _data: P;

  /**
   *
   * @param template The path to the file containing the HTML
   * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
   */
  constructor() {
    super();
    this._data = {} as P;
    this.lifeCycleState = LifeCycle.Init;
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    if (this.constructor['useParentStyles'] && this.constructor['withShadow'] && !this.constructor['globalStyle']) {
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

  protected receiveMessage(event) {
    if (event.data.type === 'setData' && (event.data.target === this.readAttribute('id', '') || this.localName === event.data.target)) {
      this.setData.apply(this, event.data.args);
    }
  }

  /**
   * Inform caller about reaching a state in life cycle.
   *
   * @param cycle The state reached.
   */
  protected lifeCycle(cycle: LifeCycle): void {}

  /**
   * Implement and return a string with HTML. Ideally use JSX to create elements.
   */
  public abstract render(): string;

  /**
   * Clean up any resources here.
   */
  protected dispose(): void {}

  /**
   * Get the assigned state data the component holds internally.
   * @param key Optionally pull just one key from the dictionary.
   */
  protected get data(): P {
    return this._data;
  }

  /**
   * Refresh the content after changes. Called automatically after changes of attrbibutes.
   */
  protected setup() {
    this.lifeCycleState = LifeCycle.PreRender;
    console.log((<any>this.constructor).selector + ' WS ', (<any>this.constructor).withShadow);
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
   * @param key Name of the value.
   * @param newValue The actual new value.
   */
  public setData(key: string, newValue: any): void {
    this.lifeCycleState = LifeCycle.SetData;
    const rerender = this.data[key] !== newValue;
    this.data[key] = newValue;
    // something is new so we rerender
    if (rerender) {
      this.setup();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.data[name] = newValue;
      this.setup();
    }
  }

  connectedCallback() {
    this.lifeCycleState = LifeCycle.Connect;
    this.setup();
  }

  protected readAttribute(name: string, defaultValue?: any) {
    return this.attributes[name] === undefined ? defaultValue : this.attributes[name].value;
  }

  disconnectedCallback() {
    this.lifeCycleState = LifeCycle.DisConnect;
    this.dispose();
    this.lifeCycleState = LifeCycle.Disposed;
  }
}
