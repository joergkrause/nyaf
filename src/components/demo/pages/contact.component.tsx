import { BaseComponent, LifeCycle } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder, IModel, to, Display } from '@nyaf/forms/';


@CustomElement('app-contact')
@ViewModel(ContactModel, { factory: m => m.email = 'bla@fasel.com' })
export class ContactComponent<T extends ContactModel> extends BaseComponent implements IModel<ContactModel> {

  model: ModelBinder<ContactModel>;

  constructor() {
    super();
    this.model.setScope(new ContactModel());
  }

  async render() {
    return await (
      <>
        <h2>Contact</h2>
        <form >
          <div>
            <label n-bind='innerText: email: displayName'>Dynamic</label>
            <label n-bind={to<ContactModel>(c => c.email, 'innerText', Display)}>Dynamic</label>
            <input n-bind='value: email' />
            <input n-bind={to<ContactModel, HTMLInputElement>(c => c.email, c => c.value)} />
            <input n-bind={to<T, HTMLInputElement>(c => c.email, 'value')} />
            <div class='alert alert-danger' n-bind='innerText: email: errPattern' n-if={this.model.state['email']}></div>
            <br />
            <button type='button' n-sel='btn' n-on-click={(e) => this.reset(e)}></button>
          </div>
          <div>
            <label n-bind='innerText: email' />
          </div>
        </form>
      </>
    );
  }

  reset(e: Event) {
    alert(this.model.getScope().email);
    //this.model.getScope().email = '';
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
