import { BaseComponent, ComponentData, CustomElement } from '../base.component';
import JSX from '../jsx';

interface MainProps {
	title: string;
	tabs: [];
}


// Step 1: Create the Components active parts
@CustomElement('app-tabs')
export class TabsComponent extends BaseComponent {
  public props: MainProps;

  constructor() {
    super();
		this.props = {
			title: this.readAttribute('title', 'Anzeigen'),
			tabs: this.readAttribute('tabs', [])
		};

	}

	protected getData(): ComponentData {
		return this.props;
	}

	static get observedAttributes() {
		return ['title', 'tabs'];
	}

	protected render() {
    const { tabs, title } = this.props;
    console.log('tabs.component:tabs', tabs);
    console.log('tabs.component:title', title);
    return (
    <>
      <h3>{title}</h3>
      <app-tab repeat={tabs} for-title="@title">@tab</app-tab>
    </>
    );
	}
}
