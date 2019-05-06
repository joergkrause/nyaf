import { BaseComponent, ComponentData, CustomElement } from '../base.component';
import { JSX } from '../JSX';
import { TabsComponent } from 'demo/shared/tabs.component';

interface MainProps {
	title: string;
	tabs: [];
}

@CustomElement('page-main')
export class MainPageComponent extends BaseComponent {
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
		return ['title', 'page'];
	}

	protected render() {
		this.innerHTML = (
			<section>
				<div id="app-content" class="row">
					<app-tabs class="col">
            <app-tab repeat="let tab of this.props.tabs">@tab.name</app-tab>
          </app-tabs>
				</div>
			</section>
		);
	}


}
