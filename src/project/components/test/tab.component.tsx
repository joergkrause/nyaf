import { BaseComponent, ComponentData, CustomElement } from '../base.component';
import JSX from '../jsx';

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

	protected render() {
		return (
			<div class="main-header" n-if={this.props.title !== 't1'}>
				<ul class="nav nav-tabs" id="header-tabs">
					{this.props.title}
				</ul>
				<div style="clear:both" class="row content tab-content">
					{this.props.content}
				</div>
			</div>
		);

	}
}
