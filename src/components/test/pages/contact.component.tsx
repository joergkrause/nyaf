import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement, ShadowDOM, UseParentStyles } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel } from '@nyaf/forms/';

// Step 1: Create the Components active parts
@CustomElement('app-contact')
@ShadowDOM(true)
@UseParentStyles()
@ViewModel<ContactModel>(ContactModel)
export class ContactComponent extends BaseComponent {
  contactModel: ContactModel;

  constructor() {
    super();
    this.contactModel = new ContactModel();
  }

  render() {
    console.log('contact');
    return (
      <>
        <h2>Contact</h2>
        <div class='alert alert-danger'>This page makes use of the forms extension and is not yet ready.</div>
        <form n-model={this.contactModel}>
          <label n-model={() => this.contactModel.name} />
          <input n-model={() => this.contactModel.name} />
        </form>
      </>
    );
  }
}
