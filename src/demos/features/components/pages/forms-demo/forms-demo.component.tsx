import { BaseComponent, LifeCycle, Select } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ContactModel } from './components/models/contact.model';
import { ViewModel, ModelBinder, IModel, to, Display, bind } from '@nyaf/forms/';
import { ValueBindingHandler } from '@nyaf/forms';

@CustomElement('app-forms-demo')
@ViewModel(ContactModel, {
  factory: (m: ContactModel) => {
    m.email = 'bla@fasel.com';
    m.name = 'Test Name';
  },
  handler: { 'value': new ValueBindingHandler() }
})
export class FormsDemoComponent<T extends ContactModel> extends BaseComponent implements IModel<ContactModel> {

  model: ModelBinder<ContactModel>;
  @Select('#mybtn') btn: HTMLButtonElement;

  constructor() {
    super();
  }

  async render() {
    const d = {
      'renderer': true,
      'data': 123
    };
    return await (
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
            <div class='display-3 mt-10' style='box-shadow: 5px 5px 20px grey;'>Forms Demo
            <small style='font-size:30%; display: block;'>Model Binding, View Model Support, Validation, ...</small></div>
          </div>
        </div>
        <div class='row' style='position: relative; margin-top: 50px; top:125px'>
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='100'>
            <h3 class='display-4' id='tabs'>Tabs</h3>

            <form >
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
                {/* <div class='alert alert-danger' n-bind='innerText: email: errPattern' n-show={this.model.state.validators?.email.type.pattern}></div> */}
                <div class='alert alert-danger' n-bind='innerText: email: errRequired' ></div>
                <br />
                <button type='button' id='mybtn' n-on-click={(e) => this.reset(e)}></button>
              </div>
              <h4>Control output</h4>
              <div>
                <label n-bind='innerText: email' />
              </div>
              <app-button class='col-6' text='Show the bound value' n-on-showAlert={this.showEmail} {...d} />
            </form>
          </div>
          <div class='col-2'>
            NAV
          </div>
        </div>
      </div>
    );
  }

  changeType(e: Event) {
    this.model.scope.toggleType = this.model.scope.toggleType === 'text' ? 'password' : 'text';
  }

  showEmail() {
    alert(this.model.scope.email);
  }

  reset(e: Event) {
    this.model.scope.email = '';
  }

  lifeCycle(state: LifeCycle) {
    if (LifeCycle.Load === state) {
      this.btn.innerText = 'Click to empty form';
    }
  }

}
