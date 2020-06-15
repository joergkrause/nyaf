import { BaseComponent, Properties } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { TabComponent } from './tab.component';

interface MainProps {
  title: string;
  tabs: [];
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
    console.log('tabs.component:tabs', tabs);
    console.log('tabs.component:title', title);
    return await (
      <>
        <h5>{title}</h5>
        <ul class='nav nav-tabs' id='header-tabs'>
          <app-tab n-repeat={tabs} title='@@title' content='@@tab' active={super.data.current} n-on-click={e => this.select(e)} n-async/>
        </ul>
        <p>
          Selected Tab: {super.data.current}
        </p>
      </>
    );
  }
}
