import JSX, { BaseComponent, CustomElement, LifeCycle, Select } from '@nyaf/lib';
import { ComplexComponent } from './components/complex.component';
import { ComplexBoolComponent } from './components/complexbool.component';
import { ButtonComponent } from './components/button.component';

@CustomElement('app-lib-demo')
export class LibDemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickBtn(e: CustomEvent) {
    alert('Button clicked ' + e.detail.customData);
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
      <div style='position: relative; top: 30px;' class='container'>
        <style>
          {`nav {
            background-color: black !important;
          }
          footer {
            position: fixed;
            width: 100%;
            bottom: 0;
          }
          `}
        </style>
        <div class='row' style='position: fixed; margin-top:8px; background-color: white; z-index: 1000; width: 100%;'>
          <div class='col'>
            <div class='display-3 mt-10' style='box-shadow: 5px 5px 20px grey;'>Core Library Demo
            <small style='font-size:30%; display: block;'>Components, Services, Events, Smart Rendering, ...</small></div>
          </div>
        </div>
        <div class='row' style='position: relative; margin-top: 50px; top:125px'>
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='100'>
            <h3 class='display-4' id='tabs'>Tabs</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2 m-2'>Control tabs with data provides as attribute (data binding).
                The first entry is not shown because of an 'n-if' statement in the tab component itself. The
                behavior is made by catching the click event and forwarding the title to the client on re-render.
                The event takes care of catching the next parent that has the right method. That means, a method
                calles 'select' must exists. The event object is a Event like object build artifically.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-tabs class='col-6' title='Tabs Demo Title' tabs={tabs} />
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
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
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='counter'>Counter</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>Simple counter using events.
                A simple counter with direct events and logic within the component. The event handler can use static,
                primitive values like this:
                <pre>(e) =&gt; this.functionCall(e, 5)</pre>
            However, the values are not being evaluated until final call is being made, and then parsed for
            string, boolean, and number. That means, "5-2" would be a string and any number evaluation 5-2 would
            result in NaN.<br />
            Even a predefined variable cannot resolve properly in that particular context. This is not allowed:
            <pre>(e) =&gt; this.functionCall(e, val)</pre>
                </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-counter class='col-6' />
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
                <pre>
                  {`import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';

interface CounterProps { cnt: number; }

@CustomElement('app-counter')
@Properties<CounterProps>({ cnt: 0})
export class CounterComponent extends BaseComponent<CounterProps> {
  eventData: any;

  constructor() {
    super();
    super.setData('cnt',  10);
  }

  clickMeAdd(v: number, param: number = 1) {
    console.log('Counter Element Click');
    super.data.cnt += param;
  }

  clickMeSub(v: number, param: number = 1) {
    console.log('Counter Element Click');
    super.data.cnt -= param;
  }

  render() {
    return (
      <>
        &lt;div>
        &lt;button type='button' n-on-click={e => this.clickMeAdd(e)}>
            Add 1
        &lt;/button>
        &lt;button type='button' n-on-click={e => this.clickMeSub(e)}>
            Sub 1
        &lt;/button>
        &lt;/div>
        &lt;div>
        &lt;button type='button' n-on-click={e => this.clickMeAdd(e, 5)}>
            Add 5
        &lt;/button>
        &lt;button type='button' n-on-click={e => this.clickMeSub(e, 5)}>
            Sub 5
        &lt;/button>
        &lt;/div>
        &lt;pre style='border: 1px solid gray;'>{ super.data.cnt }&lt;/pre>
      </>
    );
  }
}
`}
                </pre>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='service'>Service Counter</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation' active={true}>
                <div class='alert alert-info m-2'>Simple counter using a service.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-service-counter class='col-6' />
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
                A counter using a service class being injected as singleton. Use this to define:<br></br>
                <pre>{'@InjectService(CounterService)'}</pre>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='button'>Button</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>Using a button and custom event for interaction.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-button class='col-6' text={btnText} n-on-showAlert={e => this.clickBtn(e)} />
              </app-slot-tab>
              <app-slot-tab title='Source Code'>

              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='render'>Smart Render</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  The component re-renders automatically if an attribute is being changed externally.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>

              </app-slot-tab>
              <app-slot-tab title='Source Code'>
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
              </app-slot-tab>
            </app-slot-tabs>
            <div class='row'>
              <app-button class='col-3' text='Change text of next button' n-on-showAlert={e => this.changeOtherButton(e)} />
              <app-button class='col-3' text='Default Text' data-demo-button />
              <app-button class='col-3' text='Set next button to "000"' n-on-showAlert={e => this.changeOtherButtonZToZeros(e)} />
            </div>
            <hr />
            <h3 class='display-4' id='extends'>Extends Components</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  The component re-renders automatically if an attribute is being changed externally.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <p is='app-para' text='A custom para element'></p>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>

              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='slot'>Slotted Components</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Define content by adding slots instead of attributes. Is useful if content is complex and
                  doesn't fit into an attribute. Be aware, that this is only working in shadowed components.
                  Hence, you must add the @ShadowDOM() decorator to the component containing slots.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-slot>
                  <span slot='header'>This is a header</span>
                  <div class='alert alert-primary' slot='content'>
                    Some content projected into the <b>slottable</b> component.
            </div>
                </app-slot>
                <div class='test'>This is red if an outer style is loaded (link element)</div>
                <app-slot-tabs>
                  <app-slot-tab title='Slot Tab 1'>
                    <div class='test'>Content 1</div>
                  </app-slot-tab>
                  <app-slot-tab title='Slot Tab 2'>
                    <div>Content 2</div>
                  </app-slot-tab>
                </app-slot-tabs>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='params'>Complex Params</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Use complex objects as params.
          </div>

              </app-slot-tab>
              <app-slot-tab title='Playground'>
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
              </app-slot-tab>
              <app-slot-tab title='Source Code'>

              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3>Attribute Expander</h3>
            <app-slot-tab>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Create classes that expand attributes. Tired of thing like this again and again?
            <pre>
                    &lt; button type="button" class="btn btn-sm btn-info" &gt;
            </pre>
            Write this instead:
            <pre>
                    &lt; button n-expand="info-button" &gt;
            </pre>
            Applies to any component, even custom ones. Can deliver static values only. Renders before render engine gets acvcess, so completely transparent.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <button n-expand='danger-button'>Expanded attributes</button>
              </app-slot-tab>
              <app-slot-tab title='Source Code'></app-slot-tab>
            </app-slot-tab>
            <div class='row'>

              <div class='col-6'>...</div>
              <div>

              </div>
            </div>
          </div>
          <div class='col-2' style='position: fixed; right: 15px;'>
            <nav id='demonav'>
              <ul class='nav nav-pills nav-stacked'>
                <li class='nav-item'>
                  <a class='nav-link' href='#tabs'>Nested Components</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#counter'>Event Handling</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#service'>Using Services</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#button'>Custom Events</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#render'>Smart Render</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#extends'>Extend Tags</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#slot'>Use Slots and Shadow DOM</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#params'>Complex Paremeters</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >
    );
  }

  onLifeCycle(e: CustomEvent) {
    // console.log('LifeCycle Event', e.detail);
  }

  lifeCycle(lc: LifeCycle) {
    if (lc === LifeCycle.Load) {
      //
    }
  }

  // tslint:disable-next-line: member-ordering
  @Select('#complexDemo') complexDemo: ComplexComponent;

  setOther(e: Event) {
    const cd = this.complexDemo;
    if (cd) {
      cd.setData('demo', [{ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }]);
    }
  }

  setYesNo(e: Event) {
    const yesno = (e.target as HTMLButtonElement).getAttribute('data-value') === 'yes';
    (this.querySelector('#complexDemoBool') as ComplexBoolComponent).setData('demo', yesno);
  }

  changeOtherButton(e: CustomEvent) {
    this.querySelector<ButtonComponent>('app-button[data-demo-button]').setData('text', Math.round(Math.random() * 100));
  }

  changeOtherButtonZToZeros(e: CustomEvent) {
    this.querySelector<ButtonComponent>('app-button[data-demo-button]').setZero();
  }

};;
