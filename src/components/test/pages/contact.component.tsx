import { BaseComponent, ComponentData, LifeCycle } from '@nyaf/lib';
import JSX, { CustomElement, ShadowDOM, UseParentStyles } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel, ModelBinder } from '@nyaf/forms/';


@CustomElement('app-contact')
@ViewModel<ContactModel>(ContactModel)
export class ContactComponent extends BaseComponent {

  modelbinder: ModelBinder;
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
          <label n-bind='innerText: name'  />
          <input n-bind='value: email' />
          <button n-sel='btn'></button>
        </form>
      </>
    );
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      this.modelbinder = ModelBinder.initialize(this);
      this.modelbinder.setScope(this.contactModel);
      (this.$['btn'] as HTMLElement).classList.add('btn');
      (this.$['btn'] as HTMLElement).classList.add('btn-primary');
      (this.$['btn'] as HTMLElement).classList.add('btn-sm');
      this.$$('button').innerText = 'Test';
     }
   }

}
