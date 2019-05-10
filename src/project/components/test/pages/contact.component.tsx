import { BaseComponent, ComponentData, CustomElement } from '../../base.component';
import JSX from '../../jsx';


// Step 1: Create the Components active parts
@CustomElement('app-contact')
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
    return (
      <>
        <h2>Contact</h2>
        <app-button></app-button>
      </>
    );
	}
}
