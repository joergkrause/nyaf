import { ServiceType, Component } from '../types/common';

export function CustomElement(name: string) {
  return function(target: any) {
    Object.defineProperty(target, 'selector', {
      get: function() {
        return name;
      }
    });
  };
}

export function CustomService<T>(name: string, type: ServiceType<T>) {
  return function(target: any) {
    // closure to create a singleton
    const t = new type();
    Object.defineProperty(target, 'service', {
      get: function() {
        return t;
      }
    });
  };
}

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
  constructor(protected template?: string, private withShadow = false) {
    super();
    this.setup();
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  protected receiveMessage(event) {
    if (event.data.type === 'setData' && (event.data.target === this.readAttribute('id', '') || this.localName === event.data.target)) {
      this.setData.apply(this, event.data.args);
    }
	}

	public readonly selector: string;

  abstract render(): string;

  protected dispose(): void {}

  protected abstract getData(): ComponentData;

  protected initialized: boolean;

  protected setup() {
    if (this.template) {
      const html = require(this.template);
      if (this.withShadow) {
        const template = document.createElement('template');
        template.innerHTML = html;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      } else {
        this.nonShadowHtml = html;
      }
    }
  }

  public setData(key: string, newValue: any): void {
    const rerender = this.getData()[key] === newValue;
    this.getData()[key] = newValue;

    if (rerender) {
      this.render();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.getData()[name] = newValue;
      this.render();
    }
  }

  connectedCallback() {
    if (this.nonShadowHtml) {
      this.innerHTML = this.nonShadowHtml;
    } else {
      this.innerHTML = this.render();
    }
  }

  protected readAttribute(name: string, defaultValue: any = undefined) {
    return this.attributes[name] === undefined ? defaultValue : this.attributes[name].value;
  }

  disconnectedCallback() {
    this.dispose();
  }

}
