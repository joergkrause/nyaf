import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

// Step 1: Create the Components active parts
@CustomElement('app-demo')
export class DemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  protected getData(): ComponentData {
    return null;
  }

  static get observedAttributes() {
    return [];
  }

  render() {
    const tabs = [];
    tabs.push({ content: 'test one', title: 't1' });
    tabs.push({ content: 'test two', title: 't2' });
    tabs.push({ content: 'test three', title: 't3' });
    tabs.push({ content: 'test four', title: 't4' });
    tabs.push({ content: 'test five', title: 't5' });
    return (
      <>
        <h2>Demo</h2>
        <div id="app-content" class="row">
          <app-tabs class="col" title="Tabs Demo Title" tabs={tabs} />
        </div>
        Counter:
        <app-counter />

      </>
    );
  }
}
