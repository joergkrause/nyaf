import JSX, { BaseComponent, CustomElement, LifeCycle, Events, ShadowDOM, UseParentStyles, uuidv4, Properties } from '@nyaf/lib';

interface TabStore {
  node: Node;
  targetId: string;
  id: string;
}

interface IMaterialTabsDefaultConfig {
  materialtabsDeferred?: number;
  deep?: boolean;
  fixedTabs?: boolean;

  clsComponent?: string;
  clsTab?: string;
  clsTabActive?: string;
  clsMarker?: string;

  onBeforeTabOpen?();
  onTabOpen?();
  onTabsScroll?();
  onTabsCreate?();
};

// tslint:disable-next-line:max-classes-per-file
@CustomElement('app-slot-tabs')
@Events(['all'])
@ShadowDOM(true)
@UseParentStyles(true)
export class SlotTabsComponent extends BaseComponent<{}> {

  private tabChildren: TabStore[] = [];

  constructor() {
    super();
  }

  async render() {
    let first = 0;
    const tabHeaders = Array.prototype.slice.call(this.children).map((child: Element) => {
      const targetId: string = child.id ? child.id : '_' + uuidv4();
      child.setAttribute('id', targetId);
      this.tabChildren.push({
        node: child,
        targetId,
        id: child.id
      });
      return (
        <li class='nav-item'>
          <a class={'nav-link ' + (0 === first++ ? 'active' : '')} href={`#${targetId}`} >{child.getAttribute('title')}</a>
        </li>
      );
    });
    return await (
      <>
        <ul role="nav" class="nav nav-tabs">
          {tabHeaders}
        </ul>
        <div class='row'>
          <div class='col'>
            <slot></slot>
          </div>
        </div>
      </>
    )
  }

  lifeCycle(lc: LifeCycle) {
    if (lc === LifeCycle.Load) {
      let first = 0;
      this.shadowRoot.querySelectorAll('li')
        .forEach(li => {
          li.addEventListener('click', (e: Event) => this.selectTab(e));
          if (first === 0) {
            this.openTab(li.querySelector('a').getAttribute('href'));
          }
          first++;
        });
    }
  }

  private selectTab(e: Event) {
    let targetId = (e.target as HTMLElement).getAttribute('href');
    if (!targetId) {
      const innerA = (e.target as HTMLElement).querySelector('a');
      if (innerA) {
        targetId = innerA.getAttribute('href');
      }
    }
    this.openTab(targetId);
    e.preventDefault();
    e.cancelBubble = true;
    return false;
  }

  async setTab(id: string): Promise<void> {
    const targetId = this.tabChildren.filter((child) => child.id === id).shift().targetId;
    // use shadowRoot because it is shadowed
    this.openTab(`#${targetId}`);
    return Promise.resolve();
  }

  // the visible tabs are in the shadowroot, the content is outside in the document
  private openTab(targetId: string) {
    const tabs = this.shadowRoot.querySelectorAll('li > a');
    // const tab = this.querySelector<HTMLElement>(targetId);
    const a = this.shadowRoot.querySelector(`[href="${targetId}"]`);
    // hide all
    const tabContent = this.querySelectorAll('app-slot-tab');
    tabContent.forEach((t: HTMLElement) => {
      t.classList.add('d-none');
    });
    // deactivate all
    tabs.forEach(t => {
      t.classList.remove('active');
    });
    // activate
    a.classList.add('active');
    // move the marker
    // make tabContent visible
    const currentTab = this.querySelector('app-slot-tab' + targetId);
    currentTab.classList.remove('d-none');
  }

}

@CustomElement('app-slot-tab')
@ShadowDOM(true)
@Properties<{ active: boolean }>({ active: false })
export class SlotTabComponent extends BaseComponent<{ active: boolean }> {

  private _title: string;

  constructor() {
    super();
    this.classList.add('hide');
  }

  async render() {
    return await (
      <div id={this.getAttribute('data-id')}>
        <slot></slot>
      </div>
    );
  }

  public get title() {
    return this._title;
  }

  public set title(value) {
    this._title = value;
  }

  public get active() {
    return this.data.active;
  }

  public set active(value) {
    this.data.active = value;
  }

}
