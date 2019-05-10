import { BaseComponent, ComponentData, CustomElement } from '../base.component';
import { JSX } from '../jsx';
import { TabsComponent } from './tabs.component';


@CustomElement('app-main')
export class MainComponent extends BaseComponent {

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
    const tabs = [];
    tabs.push({ content: "test one", title: "t1" });
    tabs.push({ content: "test two", title: "t2" });
    tabs.push({ content: "test three", title: "t3" });
    tabs.push({ content: "test four", title: "t4" });
    tabs.push({ content: "test five", title: "t5" });
		return (
			<section>
        <h2>Demo</h2>
				<div id="app-content" class="row">
					<app-tabs class="col" title="Tabs Demo Title" tabs={tabs}></app-tabs>
				</div>
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <a href="#/demo">Demo</a>
        <a href="#/contact">Contact</a>
        <div n-router-outlet></div>
        <app-button></app-button>
			</section>
		);
	}


}
