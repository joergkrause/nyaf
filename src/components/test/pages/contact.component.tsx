import { BaseComponent, ComponentData, LifeCycle } from '@nyaf/lib';
import JSX, { CustomElement, ShadowDOM, UseParentStyles } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder, IModel } from '@nyaf/forms/';


@CustomElement('app-contact')
@ViewModel(ContactModel, { factory: m => m.email = 'bla@fasel.com' })
export class ContactComponent extends BaseComponent implements IModel<ContactModel> {

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
            <input n-bind='value: email' />
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
    if (state === LifeCycle.Load) {

      (this.$['btn'] as HTMLElement).classList.add('btn');
      (this.$['btn'] as HTMLElement).classList.add('btn-primary');
      (this.$['btn'] as HTMLElement).classList.add('btn-sm');
      this.$$('button').innerText = 'Click to empty form';
    }
  }

}
