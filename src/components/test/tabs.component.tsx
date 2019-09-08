import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

interface MainProps {
  title: string;
  tabs: [];
}

// Step 1: Create the Components active parts
@CustomElement('app-tabs')
export class TabsComponent extends BaseComponent<{ current: string }> {
  public props: MainProps;

  constructor() {
    super();
    // set by @Properties<T>(t)
    this.props = {
      title: super.readAttribute('title', 'Anzeigen'),
      tabs: super.readAttribute('tabs', [])
    };
    super.data.current = '';
  }

  protected getData(): ComponentData {
    return this.props;
  }

  static get observedAttributes() {
    return ['title', 'tabs'];
  }

  select(e) {
    super.data.current = e.srcElement.attributes['title'];
    this.render();
  }

  render() {
    const { tabs, title } = this.props;
    console.log('tabs.component:tabs', tabs);
    console.log('tabs.component:title', title);
    return (
      <>
        <h5>{title}</h5>
        <ul class='nav nav-tabs' id='header-tabs'>
          <app-tab n-repeat={tabs} title='@title' content='@tab' active={super.data.current} n-on-click={e => this.select(e)} />
        </ul>
      </>
    );
  }
}
