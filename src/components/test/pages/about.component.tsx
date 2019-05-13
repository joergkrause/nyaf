import { BaseComponent, ComponentData } from 'nyaf';
import JSX, { CustomElement } from 'nyaf';

// Step 1: Create the Components active parts
@CustomElement('app-about')
export class AboutComponent extends BaseComponent {

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
      <h2>About</h2>
    );
	}
}
