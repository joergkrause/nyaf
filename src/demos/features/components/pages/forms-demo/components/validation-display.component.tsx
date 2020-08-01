import { BaseComponent, LifeCycle, Select } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder, IModel, to, val, Required, Email, MaxLength } from '@nyaf/forms/';
import { DisplayBindingHandler, ValueBindingHandler } from '@nyaf/forms';

@CustomElement('app-validation-display')
@ViewModel(ContactModel, {
  factory: (m: ContactModel) => {
    m.email = 'bla@fasel.com';
    m.name = 'Test Name';
  },
  handler: { 'value': new ValueBindingHandler() }
})
export class ValidationDisplayDemoComponent<T extends ContactModel> extends BaseComponent implements IModel<ContactModel> {

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
      <form >
        <div>
          <h4>Validiation Logic Test</h4>
          <p>
            Type a value and watch messages appear/disappear
          </p>
          <input n-bind={to<T, HTMLInputElement>(c => c.email, 'value')} />
          <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, Required, DisplayBindingHandler)} ></div>
          <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, Email, DisplayBindingHandler)} ></div>
          <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, MaxLength, DisplayBindingHandler)} ></div>
          <br />
          <button type='button' id='mybtn' n-on-click={(e) => this.show(e)}>Show Validation State Object</button>
        </div>
        <h4>Control output</h4>
        <pre>
          <code id='output'></code>
        </pre>
      </form>
    );
  }

  show(e: Event) {
    this.querySelector('#output').textContent = JSON.stringify(this.model.state, null, 2);
  }

}
