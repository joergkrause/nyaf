import { BaseComponent, ComponentData } from '../base.component';
import JSX from '../jsx';
import { CustomElement } from 'decorators';

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
    // set by @Properties<T>(t)
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

	render() {
    const { tabs, title } = this.props;
    console.log('tabs.component:tabs', tabs);
    console.log('tabs.component:title', title);
    return (
    <>
      <hr />
      <h3>{title}</h3>
      <ul class="nav nav-tabs" id="header-tabs">
        <app-tab n-repeat={tabs} title="@title" content="@tab"></app-tab>
      </ul>
    </>
    );
	}
}
