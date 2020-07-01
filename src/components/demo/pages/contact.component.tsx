import { BaseComponent, LifeCycle } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder, IModel, to, Display, Email } from '@nyaf/forms/';

@CustomElement('app-contact')
@ViewModel(ContactModel, { factory: m => m.email = 'bla@fasel.com' })
export class ContactComponent<T extends ContactModel> extends BaseComponent implements IModel<ContactModel> {

  model: ModelBinder<ContactModel>;

  constructor() {
    super();
  }

  async render() {
    return await (
      <>
        <h2>Contact</h2>
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
            <h4>Validiation Logic Test</h4>
            <div class='alert alert-danger' n-bind='innerText: email: errPattern' n-show={this.model.state.validators?.email.type.pattern}></div>
            <div class='alert alert-danger' n-bind='innerText: email: errRequired' ></div>
            <br />
            <button type='button' n-sel='btn' n-on-click={(e) => this.reset(e)}></button>
          </div>
          <h4>Control output</h4>
          <div>
            <label n-bind='innerText: email' />
          </div>
          <app-button class='col-6' text='Show the bound value' n-on-showAlert={this.showEmail} />
        </form>
      </>
    );
  }

  showEmail() {
    alert(this.model.getScope().email);
  }

  reset(e: Event) {
    this.model.getScope().email = '';
  }

  lifeCycle(state: LifeCycle) {
    if(LifeCycle.Load === state) {
      (this.$['btn'] as HTMLElement).classList.add('btn');
      (this.$['btn'] as HTMLElement).classList.add('btn-primary');
      (this.$['btn'] as HTMLElement).classList.add('btn-sm');
      this.$$('button').innerText = 'Click to empty form';
    }
  }

}
