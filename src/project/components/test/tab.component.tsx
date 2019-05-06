import { BaseComponent, ComponentData, CustomElement } from '../base.component';
import JSX from '../jsx';

export interface TabProps {
  title: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tab')
export class TabsComponent extends BaseComponent {

  public props: TabProps;

  constructor() {
    super();
    this.props = {
      title: this.readAttribute('title', 'Tab Title')
    }
	}

	protected getData(): ComponentData {
		return null;
	}

	static get observedAttributes() {
		return [];
	}

	protected render() {
		this.innerHTML = (
			<div class="main-header">
				<ul class="nav nav-tabs" id="header-tabs">
					{this.props.title}
				</ul>
				<div style="clear:both" class="row content tab-content">
					{this.innerHTML}
				</div>
			</div>
		);

	}
}
