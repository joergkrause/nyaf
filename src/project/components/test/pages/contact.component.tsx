import { BaseComponent, ComponentData } from '../../base.component';
import JSX from '../../jsx';
import { ShadowDOM, CustomElement } from 'decorators';


// Step 1: Create the Components active parts
@CustomElement('app-contact')
@ShadowDOM(true)
export class ContactComponent extends BaseComponent {

  constructor() {
    super();
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
      </>
    );
	}
}
