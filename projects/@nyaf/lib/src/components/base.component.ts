// TODO: Implement https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445

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
export abstract class BaseComponent extends HTMLElement {

  /**
   *
   * @param template The path to the file containing the HTML
   * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
   */
  constructor() {
    super();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
    if (BaseComponent.useParentStyles && BaseComponent.withShadow && !BaseComponent.globalStyle) {
      for (let i = 0; i <= this.ownerDocument.styleSheets.length; i++) {
        const css: CSSStyleSheet = this.ownerDocument.styleSheets[i] as CSSStyleSheet;
        if (css.rules[0].cssText.startsWith(':ignore')) continue;
        BaseComponent.globalStyle = Object.keys(css.cssRules)
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

  abstract render(): string;

  protected dispose(): void {}

  protected abstract getData(): ComponentData;

  protected initialized: boolean;

  protected setup() {
    this.initialized = true;
    console.log((<any>this.constructor).selector + ' WS ', (<any>this.constructor).withShadow);
    if ((<any>this.constructor).withShadow) {
      const template = document.createElement('template');
      template.innerHTML = this.render();
      if (!this.shadowRoot || this.shadowRoot.mode === 'closed') {
        this.attachShadow({ mode: 'open' });
        // copy styles to shadow if shadowed and there is something to add
        if ((<any>this.constructor).useParentStyles && BaseComponent.globalStyle) {
          const style = document.createElement('style');
          style.textContent = BaseComponent.globalStyle;
          this.shadowRoot.appendChild(style);
        }
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListener('click', e => {
          const new_e = new MouseEvent('shadowclick');
          this.dispatchEvent(new_e);
        });
      }
    } else {
      this.innerHTML = this.render();
    }
  }

  public setData(key: string, newValue: any): void {
    const rerender = this.getData()[key] !== newValue;
    this.getData()[key] = newValue;
    // something is new so we rerender
    if (rerender) {
      this.setup();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.getData()[name] = newValue;
      this.setup();
    }
  }

  connectedCallback() {
    this.setup();
  }

  protected readAttribute(name: string, defaultValue: any = undefined) {
    return this.attributes[name] === undefined ? defaultValue : this.attributes[name].value;
  }

  disconnectedCallback() {
    this.dispose();
  }
}
