import JSX, { BaseComponent, CustomElement, LifeCycle, Select, InjectService } from '@nyaf/lib';
import { ComplexComponent } from './components/complex.component';
import { ComplexBoolComponent } from './components/complexbool.component';
import { ButtonComponent } from './components/button.component';
import { HighlightService } from '../../../services/highlight.service';


@CustomElement('app-lib-demo')
@InjectService('highlight', HighlightService)
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
    const simpleText = 'Provided by Code';
    return (
      <div class='container main-adjust'>
        <app-page-intro header='Core Library Demo' small='Components, Services, Events, Smart Rendering, ...'></app-page-intro>
        <div class='row' >
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='10'>
            <h3 class='display-4' id='simple' source='simple'>Simple Component</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation' >
                <div class='alert alert-info  mb-5'>A simple component with little more than 'Hello World'. The code shows how to create a
                simple component, add properties, and handle dynamic data. Properties can also have default values.
                </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <p>
                  This has static text in the attribute:
                </p>
                <app-simple text='Text set from attribute'></app-simple>
                <p>
                  This just keeps the default:
                </p>
                <app-simple></app-simple>
                <p>
                  This has text provided by code:
                </p>
                <app-simple text={simpleText}></app-simple>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='tabs' source='tabs'>Nested Components</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info mb-5'>Control tabs with data provides as attribute (data binding).
                The first entry is not shown because of an <code>n-if</code> statement in the tab component itself. The
                behavior is made by catching the click event and forwarding the title to the client on re-render.
                The event takes care of catching the next parent that has the right method. That means, a method
                called 'select' must exist. The event object is a Event like object build artifically.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-tabs class='col-6' title='Tabs Demo Title' tabs={tabs} />
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='counter' source='counter'>Event Handling</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  <p>
                    Simple counter using events.
                    A simple counter with direct events and logic within the component. The event handler can use static,
                    primitive values like this:
                  </p>
                  <pre><code>(e) =&gt; this.functionCall(e, 5)</code></pre>
                  <p>
                    However, the values are not being evaluated until final call is being made, and then parsed for
                    string, boolean, and number. That means, "5-2" would be a string and any number evaluation 5-2 would
                    result in NaN.</p>
                  <p>
                    Even a predefined variable cannot resolve properly in that particular context. This is not allowed:
                    </p>
                  <pre><code>(e) =&gt; this.functionCall(e, val)</code></pre>
                </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-counter cnt='100'></app-counter>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='if' source='iif'>Conditions</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>Use n-if to control parts of UI statically. This is usually usefull in combinatiom
                   with a property. Be aware that the whole component re-renders and changes to the data that control the <code>n-if</code>
                  are not being read until a full re-render. The best usage is in smaller leaf components that have a small impact
                  on the page.
                </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-if />
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='service' source='servicecounter'>Using Services</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation' active={true}>
                <div class='alert alert-info m-2'>Simple counter using a service. This shows how to define a global service
                using a decorator. Services can be singleton or use a factory to define the instance. This is not dependency
                injection, the constructors are not monitored. There is no global definition required, the decorator will
                create a property <code>.services</code> that holds a dictionary of all service instances.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-service-counter class='col-6' />
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>

            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='button' source='button'>Custom Events</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>Using a button and custom events for interaction. Custom events are a great way to express semantic
                meaning. Instead of just 'click' on something, use 'saveData' or 'removeItem' and get semantically enhanced components.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-button class='col-6' text={btnText} n-on-showAlert={e => this.clickBtn(e)} />
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>

            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='smart' source='smart'>Smart Render</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  The component re-renders automatically if an attribute is being changed externally.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <div class='row'>
                  <app-button class='col-3' text='Change text of next button' n-on-showAlert={e => this.changeOtherButton(e)} />
                  <app-button class='col-3' text='Default Text' data-demo-button />
                  <app-button class='col-3' text='Set next button to "000"' n-on-showAlert={e => this.changeOtherButtonToZeros(e)} />
                </div>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='slot' source='slotted'>Use Slots</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Project content by adding slots instead of attributes. Is useful if content is complex and
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
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='shadow' source='shadow'>Use Shadoew DOM</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Isolate components by using a shadow DOM and handle external content. This is demoed by a Tabs component.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-slot-tabs>
                  <app-slot-tab title='Slot Tab 1'>
                    <div class='test'>Content 1</div>
                  </app-slot-tab>
                  <app-slot-tab title='Slot Tab 2'>
                    <div>Content 2</div>
                  </app-slot-tab>
                </app-slot-tabs>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='params' source='complex'>Complex Parameters</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Use complex objects as parameters. See how mto deal with objects and arrays.
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
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='expander' source='expander'>Expand Properties</h3>
            <app-slot-tabs>
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
                <app-expander></app-expander>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='directive' source='directive'>Directives</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Extend components by re-usable actions.
                </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-directive></app-directive>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <br></br><br></br><br></br><br></br><br></br><br></br>
          </div>
          <div class='col-2' style='position: fixed; right: 15px;'>
            <nav id='demonav'>
              <ul class='nav flex-column'>
                <li class='nav-item'>
                  <a class='nav-link' href='#simple'>Simple Component</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#tabs'>Nested Components</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#counter'>Event Handling</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#if'>Conditions</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#service'>Using Services</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#button'>Custom Events</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#smart'>Smart Render</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#slot'>Use Slots</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#shadow'>Shadow DOM</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#params'>Complex Parameters</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#expander'>Expand Properties</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#directive'>Directives</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >
    );
  }

  lifeCycle(lc: LifeCycle) {
    if (lc === LifeCycle.Load) {
      this.services<HighlightService>('highlight').setup(this);
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

  changeOtherButtonToZeros(e: CustomEvent) {
    this.querySelector<ButtonComponent>('app-button[data-demo-button]').setZero();
  }

}

/**
 *             <h3 class='display-4' id='expander' source='expander'>Extends Tags</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info m-2'>
                  Often you need a bunch of repeating attributes. An expander replaces a single call with all the static attributes. It's a very simple yet convenient extensions.
          </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <p is='app-para' text='A custom para element'></p>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />

 */