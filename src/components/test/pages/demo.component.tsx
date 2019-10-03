import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

// Step 1: Create the Components active parts
@CustomElement('app-demo')
export class DemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickBtn(e) {
    alert('Button clicked');
  }

  render() {
    const tabs = [];
    tabs.push({ content: 'test one', title: 't1' });
    tabs.push({ content: 'test two', title: 't2' });
    tabs.push({ content: 'test three', title: 't3' });
    tabs.push({ content: 'test four', title: 't4' });
    tabs.push({ content: 'test five', title: 't5' });
    const btnText = 'Static Button Text';
    return (
      <div class='container'>
        <h2>Demo</h2>
        <h3>Tabs</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>Control tabs with data provides as attribute (data binding).</div>
          <div class='col-6'>
            Data prepared in the component:
            <pre>
              {`const tabs = [];
tabs.push({ content: 'test one', title: 'Title 1' });
tabs.push({ content: 'test two', title: 'Title 2' });
tabs.push({ content: 'test three', title: 'Title 3' });
tabs.push({ content: 'test four', title: 'Title 4' });
tabs.push({ content: 'test five', title: 'Title 5' });
`}
            </pre>
            Markup in component:
            <pre>
              {`&lt;app-tabs class='col-6' 
           title='Tabs Demo Title' 
           tabs={tabs} /&gt; `}
            </pre>
          </div>
        </div>
        <div class='row'>
          <app-tabs class='col-6' title='Tabs Demo Title' tabs={tabs} />
        </div>
        <hr />
        <h3>Counter</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>Simple counter using events.</div>
          <div class='col-6'>...</div>
        </div>
        <div class='row'>
          <app-counter class='col-6' />
        </div>
        <hr />
        <h3>Store Counter</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>
            Counter using the <b>Store</b> and maintain state during unload/load
          </div>
          <div class='col-6'>...</div>
        </div>
        <div class='row'>
          <app-store-counter class='col-6' />
        </div>
        <hr />
        <h3>Button</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>Using a button and custom event for interaction.</div>
          <div class='col-6'>...</div>
        </div>
        <div class='row'>
          <app-button class='col-6' text={btnText} n-on-showAlert={e => this.clickBtn(e)} />
        </div>
        <hr />
        <h3>Form</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>
            Automation for forms using the <b>forms</b> extension.
          </div>
          <div class='col-6'>...</div>
        </div>
        <div class='row'>
          <app-form class='col-6' />
        </div>
      </div>
    );
  }
}
