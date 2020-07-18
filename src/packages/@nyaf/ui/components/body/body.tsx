import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';

/**
 * Render the children into the document's body.
 */
@CustomElement('ui-body')
export class Body extends BaseComponent<never> {
  async render() {
    Array.from(this.children).map(child => {
      document.body.appendChild(child);
    });
    return await null;
  }
}
