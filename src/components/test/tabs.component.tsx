import { BaseComponent, Properties } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

interface MainProps {
  title: string;
  tabs: [];
  current?: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tabs')
@Properties({ title: '', tabs: [] })
export class TabsComponent extends BaseComponent<MainProps> {

  constructor() {
    super();
    // set by @Properties<T>(t)
    super.data.current = '';
  }


  select(e: Event) {
    super.data.current = (e.target as HTMLElement).getAttribute('title');
    super.setup();
  }

  render() {
    const { tabs, title } = this.data;
    console.log('tabs.component:tabs', tabs);
    console.log('tabs.component:title', title);
    return (
      <>
        <h5>{title}</h5>
        <ul class='nav nav-tabs' id='header-tabs'>
          <app-tab n-repeat={tabs} title='@title' content='@tab' active={super.data.current} n-on-click={e => this.select(e)} />
        </ul>
        <p>
          Selected Tab: {super.data.current}
        </p>
      </>
    );
  }
}
