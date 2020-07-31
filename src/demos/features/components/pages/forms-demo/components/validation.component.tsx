import { BaseComponent, LifeCycle, Select } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder, IModel, to, val, Required, Email, StringLength } from '@nyaf/forms/';
import { ValueBindingHandler } from '@nyaf/forms';

@CustomElement('app-validation')
@ViewModel(ContactModel, {
  factory: (m: ContactModel) => {
    m.email = 'bla@fasel.com';
    m.name = 'Test Name';
  },
  handler: { 'value': new ValueBindingHandler() }
})
export class ValidationDemoComponent<T extends ContactModel> extends BaseComponent implements IModel<ContactModel> {

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
          <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, Required)} ></div>
          <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, Email)} ></div>
          <div class='alert alert-danger' n-bind={val<ContactModel>(c => c.email, StringLength)} ></div>
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
