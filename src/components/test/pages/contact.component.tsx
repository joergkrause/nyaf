import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement, ShadowDOM } from '@nyaf/lib';
import { ContactModel } from './models/contact.model';
import { ViewModel } from '@nyaf/forms/';

// Step 1: Create the Components active parts
@CustomElement('app-contact')
@ShadowDOM(true)
@ViewModel<ContactModel>()
export class ContactComponent extends BaseComponent {

  contactModel: ContactModel;

  constructor() {
    super();
    this.contactModel = new ContactModel();
  }

  protected getData(): ComponentData {
    return null;
  }

  static get observedAttributes() {
    return [];
  }

  render() {
    console.log('contact');
    return (
      <>
        <h2>Contact</h2>
        <div class="alert alert-danger">Contact Me</div>
        <form n-model={this.contactModel}>
          <label n-model={() => this.contactModel.name }></label>
          <input n-model={() => this.contactModel.name } />
        </form>
      </>
    );
  }
}
