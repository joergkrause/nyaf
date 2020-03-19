import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ButtonComponent } from '../button.component';
import { ComplexComponent } from '../complex.component';
import { ComplexBoolComponent } from '../complexbool.component';

// Step 1: Create the Components active parts
@CustomElement('app-demo')
export class DemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickBtn(e: CustomEvent) {
    alert('Button clicked ' + e.detail.customData);
  }

  render() {
    console.log("Render demo");
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
          <div class='alert alert-info col-6'>Control tabs with data provides as attribute (data binding).
          The first entry is not shown because of an 'n-if' statement in the tab component itself. The
            behavior is made by catching the click event and forwarding the title to the client on re-render.
            The event takes care of catching the next parent that has the right method. That means, a method
            calles 'select' must exists. The event object is a Event like object build artifically.
          </div>
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
           tabs={tabs} /&gt; n-on-click={{ e => this.select(e) }} `}
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
          <div class='col-6'>
            A simple counter with direct events and logic within the component.
          </div>
        </div>
        <div class='row'>
          <app-counter class='col-6' />
        </div>
        <hr />
        <h3>Service Counter</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>Simple counter using a service.</div>
          <div class='col-6'>
            A counter using a service class being injected as singleton. Use this to define:<br></br>
            <pre>{'@InjectService(CounterService)'}</pre>
            <br></br>
          </div>
        </div>
        <div class='row'>
          <app-service-counter class='col-6' />
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
        <h3>Smart Render</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>
            The component re-renders automatically if an attribute is being changed externally.
          </div>
          <div class='col-6'>
            This button triggers an event handler:
            <pre>
              &amp;lt;app-button class='col-6'
                          text='Click to change text of next button'
            n-on-showAlert={`e => this.changeOtherButton(e)`} /&amp;gt;
            </pre>
            The handler sets the attibute of another component. Use the <code>data</code> field and the attributes name:
            <pre>
              {`
changeOtherButton(e: CustomEvent) {
  (this.querySelector('[data-demo-button]') as any).data.text = Math.round(Math.random() * 100);
}`}
            </pre>
            There is no other action required, the component-renders immediately.
          </div>
        </div>
        <div class='row'>
          <app-button class='col-6' text='Click to change text of next button' n-on-showAlert={e => this.changeOtherButton(e)} />
          <app-button class='col-6' text='Default Text' data-demo-button />
        </div>
        <hr />
        <h3>Extends Components</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>
            The component re-renders automatically if an attribute is being changed externally.
          </div>
          <div class='col-6'>...</div>
        </div>
        <div class='row'>
          <p is='app-para' text='A custom para element'></p>
        </div>
        <hr />
        <h3>Slotted Components</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>
            Define content by adding slots instead of attributes. Is useful if content is complex and
            doesn't fit into an attribute. Be aware, that this is only working in shadowed components.
            Hence, you must add the @ShadowDOM() decorator to the component containing slots.
          </div>
          <div class='col-6'>...</div>
        </div>
        <div class='row'>
          <app-slot>
            <span slot='header'>This is a header</span>
            <div class='alert alert-primary' slot='content'>
              Some content projected into the <b>slottable</b> component.
            </div>
          </app-slot>
        </div>
        <hr />
        <app-slot-tabs>
          <app-slot-tab title='Slot Tab 1'>
            <div>Content 1</div>
          </app-slot-tab>
          <app-slot-tab title='Slot Tab 2'>
            <div>Content 2</div>
          </app-slot-tab>
        </app-slot-tabs>
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
        <hr />
        <h3>Complex Params</h3>
        <div class='row'>
          <div class='alert alert-info col-6'>
            Use complex objects as params.
          </div>
          <div class='col-6'>...</div>
          <div>
            <app-complex demo={tabs} id='complexDemo'></app-complex>
          </div>
          <button class='btn btn-primary btn-sm' style='display: block' n-on-click={(e) => this.setOther(e)}>Set other complex value</button>
          <hr></hr>
          <div>
            <app-complex-bool demo={false} id='complexDemoBool'></app-complex-bool>
          </div>
          <button class='btn btn-success btn-sm' style='display: block' n-on-click={(e) => this.setYesNo(e)} data-value='yes'>Set Yes</button>
          <button class='btn btn-danger btn-sm' style='display: block' n-on-click={(e) => this.setYesNo(e)} data-value='no'>Set No</button>
        </div>
      </div>
    );
  }

  setOther(e: Event) {
    (this.querySelector('#complexDemo') as ComplexComponent).setData('demo', []);
  }

  setYesNo(e: Event) {
    const yesno = (e.target as HTMLButtonElement).getAttribute('data-value') === 'yes';
    (this.querySelector('#complexDemoBool') as ComplexBoolComponent).setData('demo', yesno);
  }

  changeOtherButton(e: CustomEvent) {
    (this.querySelector('[data-demo-button]') as any).data.text = Math.round(Math.random() * 100);
  }

}
