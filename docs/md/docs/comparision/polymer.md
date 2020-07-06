# Polymer Lit-Element

That's really close, but still - Polymer is a bit to restrictive concerning TypeScript. These guys over their like Babel to much.

## Components

See the entry example in Polymer form their docs:

~~~js
import { LitElement, html, property, customElement } from 'lit-element';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  @property() name = 'World';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

// Usage somewhere else in HTML
<simple-greeting name="Everyone"></simple-greeting>
~~~

See the same in @nyaf:

~~~tsx
import { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

@CustomElement('simple-greeting')
@Properties({ name = 'World' });
export class SimpleGreeting extends BaseComponent<{ name: string }> {

  async render() {
    return await <p>Hello, {this.data.name}!</p>;
  }
}

// Usage somewhere else in HTML
<simple-greeting name="Everyone"></simple-greeting>
~~~

As in React, Polymer's lit-element doesn't has any template features.
