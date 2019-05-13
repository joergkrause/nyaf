// TODO: Implement https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445

export interface ComponentData {
  [key: string]: any;
}

/**
 * Base class for components. Use in derived classes with a path to a template file, and additional setup steps callback.
 * Override 'render' method (mandatory) for event wiring and data/dom manipulation or creation (dynamic part).
 */
export abstract class BaseComponent extends HTMLElement {
  private nonShadowHtml: string;

  /**
   *
   * @param template The path to the file containing the HTML
   * @param withShadow `false` to suppress using shadow dom, required for jquery-ui
   */
  constructor() {
    super();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  protected receiveMessage(event) {
    if (event.data.type === 'setData' && (event.data.target === this.readAttribute('id', '') || this.localName === event.data.target)) {
      this.setData.apply(this, event.data.args);
    }
  }

  // // set by decorator
  // private readonly useParentStyles: boolean;
  // // set by decorator
  public static readonly withShadow: boolean;
  // // set by decorator
  public static readonly selector: string;

  abstract render(): string;

  protected dispose(): void {}

  protected abstract getData(): ComponentData;

  protected initialized: boolean;

  protected setup() {
    console.log((<any>this.constructor).selector + " WS ", (<any>this.constructor).withShadow);
    if ((<any>this.constructor).withShadow) {
      const template = document.createElement('template');
      template.innerHTML = this.render();
      if (!this.shadowRoot || this.shadowRoot.mode === 'closed') {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListener('click', (e) => {
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
