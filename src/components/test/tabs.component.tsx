import { BaseComponent, Properties } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { TabComponent } from './tab.component';

interface MainProps {
  title: string;
  tabs: { title: string, tab: string }[];
  current?: string;
}


@CustomElement('app-tabs')
@Properties({ title: '', tabs: [], current: '' })
export class TabsComponent extends BaseComponent<MainProps> {

  constructor() {
    super();
  }


  async select(e: Event) {
    // source is a regular click and inside the tab is anchor tag, which would excecute withoput prevention
    e.preventDefault();
    // changing a base property triggers the render process
    this.data.current = (e.target as HTMLElement).getAttribute('title');
  }

  async render() {
    const { tabs, title } = this.data;
    const tabElements = tabs.map(t => <app-tab title={t.title} content={t.tab} active={this.data.current} n-on-click={e => this.select(e)} n-async />);
    return await (
      <>
        <h5>{title}</h5>
        <ul class='nav nav-tabs' id='header-tabs'>
          {tabElements}
        </ul>
        <p>
          Selected Tab: {this.data.current}
        </p>
      </>
    );
  }
}
