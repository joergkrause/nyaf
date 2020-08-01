import JSX, { BaseComponent, CustomElement, LifeCycle, Select } from '@nyaf/lib';
import hljs from 'highlight.js';

@CustomElement('app-forms-demo')
export class FormsDemoComponent extends BaseComponent {
  constructor() {
    super();
  }

  clickBtn(e: CustomEvent) {
    alert('Button clicked ' + e.detail.customData);
  }

  escape(code: string) {
    const htmlEncode = (c) => c.replace(/[\u00A0-\u9999<>\&]/gim, (i) => {
      return '&#' + i.charCodeAt(0) + ';';
    });
    return htmlEncode(code).replace(/&#60;/g, '<').replace(/&#62;/g, '>');
  }

  render() {
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
          [class^="hljs"] {
            white-space: pre;
          }
          .hljs {
            white-space: pre;
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
            <h3 class='display-4' id='form' source='form'>Simple Form Component</h3>
            <app-slot-tabs>
              <app-slot-tab title='Binding' >
                <div class='alert alert-info m-2 m-2'>Simple bi-directional binding.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-form></app-form>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='validation' source='validation'>Validation I</h3>
            <app-slot-tabs>
              <app-slot-tab title='Validation'>
                <div class='alert alert-info m-2 m-2'>Use validation decorators and bind validation to element's visibility.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-validation></app-validation>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='validation-display' source='validation-display'>Validation II</h3>
            <app-slot-tabs>
              <app-slot-tab title='Validation'>
                <div class='alert alert-info m-2 m-2'>Use validation decorators and bind validation to element's display style.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-validation-display></app-validation-display>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
          </div>
          <div class='col-2' style='position: fixed; right: 15px;'>
            <nav id='demonav'>
              <ul class='nav nav-pills nav-stacked'>
                <li class='nav-item'>
                  <a class='nav-link' href='#form'>Binding</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#validation'>Validation</a>
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
      hljs.configure({ useBR: true, languages: ['html', 'tsx', 'ts', 'js'] });
      this.querySelectorAll('h3').forEach(e => {
        if (e.id && this.querySelector(`#${e.id} + * [title="Demo Markup"]`)) {
          const url = this.querySelector(`h3#${e.id}`).getAttribute('source');
          // DEMO
          fetch(`assets/sources/${url}.html`).then(async (res) => {
            const data = await res.text();
            this.querySelector(`#${e.id} + * [title="Demo Markup"]`).innerHTML = <pre><code class='tsx'></code></pre>;
            const block = this.querySelector<HTMLElement>(`#${e.id} + * [title="Demo Markup"]`).querySelector('pre code');
            if (data.length > 0) {
              block.textContent = this.escape(data);
              hljs.highlightBlock(block as HTMLElement);
            } else {
              block.textContent = 'Cannot load ' + e.id;
            }
          });
          // SC
          fetch(`assets/sources/${url}.component.tsx`).then(async (res) => {
            const data = await res.text();
            this.querySelector(`#${e.id} + * [title="Source Code"]`).innerHTML = <pre><code class='tsx'></code></pre>;
            const block = this.querySelector<HTMLElement>(`#${e.id} + * [title="Source Code"]`).querySelector('pre code');
            if (data.startsWith('import')) {
              block.textContent = data;
              hljs.highlightBlock(block as HTMLElement);
            } else {
              block.textContent = 'Cannot load ' + e.id;
            }
          });
        }
      });
    }
  }
}

{/* <form >
              <div>
                <h4>Label 1 (Text)</h4>
                <label n-bind='innerText: email: displayText'>Dynamic</label>
                <h4>Label 2 (Smart Binding with "to")</h4>
                <label n-bind={to<ContactModel>(c => c.email, 'innerText', Display.text)}>Dynamic</label>
                <h4>Field 1 (Text)</h4>
                <input n-bind='value: email' />
                <h4>Field 2 (Smart Binding with "to" and lambdas)</h4>
                <input n-bind={to<ContactModel, HTMLInputElement>(c => c.email, c => c.value)} />
                <h4>Field 3 (Smart Binding with "to" and strings)</h4>
                <input n-bind={to<T, HTMLInputElement>(c => c.email, 'value')} />
                <h4>Field 4 (Smart Binding with "bind" and multi attribute binding)</h4>
                <input value={bind<T>(c => c.email)} type={bind<T>(c => c.toggleType)} n-bind />
                <button type='button' n-on-click={this.changeType}>Toggle type with binding</button>
                <p>
                  The binder falls back to the default binder, which is unidirectional, hence the values typed here do not change to object.
                  But if the object changes, it's reflected in the value.
                  </p>
                <h4>Field 5 (Smart Binding with "bind" and assigned handler)</h4>
                <input value={bind<T>(c => c.email, ValueBindingHandler)} n-bind />
                <h4>Validiation Logic Test</h4>
                <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, Required)} ></div>
                <br />
                <button type='button' id='mybtn' n-on-click={(e) => this.reset(e)}></button>
              </div>
              <h4>Control output</h4>
              <div>
                <label n-bind='innerText: email' />
              </div>
              <app-button class='col-6' text='Show the bound value' n-on-showAlert={this.showEmail} {...d} />
            </form> */}