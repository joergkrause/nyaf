import { BaseComponent, ComponentData, LifeCycle } from '@nyaf/lib';
import JSX, { CustomElement, ShadowDOM, UseParentStyles } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder, IModel } from '@nyaf/forms/';


@CustomElement('app-contact')
@ViewModel(ContactModel)
export class ContactComponent extends BaseComponent implements IModel<ContactModel> {

  model: ModelBinder<ContactModel>;
  contactModel: ContactModel;

  constructor() {
    super();
    this.contactModel = new ContactModel();
    this.contactModel.name = 'Carla';
    this.contactModel.email = 'carla@demo.com';
  }

  async render() {
    return await (
      <>
        <h2>Contact</h2>
        <form >
          <div>
            <label n-bind='innerText: email: displayName'>E-Mail</label>
            <input n-bind='value: email' />
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
    this.model.getScope().email = '';
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      this.model.setScope(this.contactModel);
      (this.$['btn'] as HTMLElement).classList.add('btn');
      (this.$['btn'] as HTMLElement).classList.add('btn-primary');
      (this.$['btn'] as HTMLElement).classList.add('btn-sm');
      this.$$('button').innerText = 'Click to empty form';
    }
  }

}
