import { BaseComponent, ComponentData } from 'nyaf';
import JSX, { CustomElement } from 'nyaf';

export interface TabProps {
  title: string;
  content: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tab')
export class TabComponent extends BaseComponent {

  public props: TabProps;

  constructor() {
    super();
    this.props = {
      title: this.readAttribute('title', 'Tab Title'),
      content: this.readAttribute('content', 'Tab content')
    }
	}

	protected getData(): ComponentData {
		return null;
	}

	static get observedAttributes() {
		return [];
	}

	render() {
		return (
			<li class="nav nav-tabs" id="header-tabs" n-if={this.props.title !== 't1'}>
				{this.props.title} <small>{this.props.content}</small>
			</li>
		);

	}
}
