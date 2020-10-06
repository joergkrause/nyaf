
## Shadow DOM

By default the shadow DOM is ____not____ used. If it would, it would mean, that styles are isolated. No global styles are available, then.

One option to activate the Shadow DOM is using this decorator:

~~~ts
@ShadowDOM()
~~~

The property can set the mode explicitly. The default is `true`, hence if nothing is set the mode is 'open'. To set to close use the value `false`.

~~~tsx
@ShadowDOM(false)
~~~

Another interesting option controls the style behavior:

~~~ts
@UseParentStyles()
~~~

* The decorator *ShadowDOM* must be set, otherwise the decorator *@UseParentStyle* does nothing
* If active, it copies all global styles into component so they work as expected even in Shadow DOM

> It's a trade-off. The shadow DOM increases performance and brings isolation. Copying many styles decreases performance and contradicts isolation.

See the following example for a common usage scenario:

~~~ts
@CustomElement('app-contact')
@ShadowDOM()
@UseParentStyles()
export class ContactComponent extends BaseComponent {
  // omitted for brevity
}
~~~

The shadow DOM goes well along with the usage of slots. A typical example is a Tabs Component that's shown next. Tabs are a form of navigation for web sites, similar to the browser's tabs.

### Example with Shadow DOM

First, we start with the definition of a single tab.

#### Single Tab

~~~tsx
import JSX, {
  BaseComponent,
  CustomElement,
  ShadowDOM,
  UseParentStyles,
  LifeCycle } from '@nyaf/lib';

@CustomElement('app-slot-tab')
@ShadowDOM()
export class SlotTabComponent extends BaseComponent<{}> {

  private _title: string;

  constructor() {
    super();
    this.classList.add('hide');
  }

  render() {
    return (
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

}
~~~

The `<slot>` element is the content target. The id is used to address the tab (to open it, actually).

### Tabs Container

Second, look at the container that handles multiple tabs.

~~~tsx
import JSX, {
  BaseComponent,
  CustomElement,
  LifeCycle,
  Events,
  ShadowDOM,
  UseParentStyles,
  uuidv4 } from '@nyaf/lib';

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
@ShadowDOM()
@UseParentStyles(true)
export class SlotTabsComponent extends BaseComponent<{}> {

  private tabChildren: TabStore[] = [];

  constructor() {
    super();
  }

  render() {
    let first = 0;
    const tabHeaders = Array.prototype
              .slice
              .call(this.children)
              .map((child: Element) => {
      const targetId: string = child.id ?? '_' + uuidv4();
      child.setAttribute('id', targetId);
      this.tabChildren.push({
        node: child,
        targetId,
        id: child.id
      });
      return (
        <li class='nav-item'>
          <a class={'nav-link ' + (0 === first++ ? 'active' : '')}
             href={`#${targetId}`} >{child.getAttribute('title')}
          </a>
        </li>
      );
    });
    return (
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
          li.addEventListener('click',
                 (e: Event) => this.selectTab(e));
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
    const targetId = this.tabChildren
        .filter((child) => child.id === id)
        .shift()
        .targetId;
    // use shadowRoot because it is shadowed
    this.openTab(`#${targetId}`);
    return Promise.resolve();
  }

  // the visible tabs are in the shadow-root,
  // the content is outside in the document
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
~~~

### Usage of the Tabs

The usage is quite simple. Just add as many tabs as required:

~~~tsx
<app-slot-tabs id='demoTabs'>
  <app-slot-tab title='Store Counter' id='d1'>
    <app-store-counter id='s1' cnt={42}></app-store-counter>
  </app-slot-tab>
  <app-slot-tab title='Store Data' id='d2'>
    <app-store-data id='s2'></app-store-data>
  </app-slot-tab>
</app-slot-tabs>
~~~

### Shadow DOM and Styles

The Shadow DOM provides full isolation. The `@UseParentStyles` decorator contradicts this. A better way is to include styles "per component". Have a look onto an example first:

~~~tsx
@CustomElement('app-directive')
@ShadowDOM()
export class DirectiveComponent extends BaseComponent<any> {

  render() {
    return (
      <>
        <button type='button' directive='drag' part='drag-button'>
          Drag me around
        </button>
        <div directive='drop' part='drop-zone'>

        </div>
      </>
    );
  }

}
~~~

The important part here is, despite the `@ShadowDOM` decorator, the `part` attribute. That makes the shadowed component accessible (penetrable) for special external styles using the `::part` pseudo-selector. A stylesheet could than look like this:

~~~css
app-directive::part(drop-zone) {
  border: 1px solid silver;
  width: 100px;
  height: 100px;
}
app-directive::part(drag-button) {
  background-color: green;
  padding: 5px;
}
~~~

This style is provided globally, not as part of the component, but it applies to this component only and only in shadow mode.

Note, that using the regular CSS syntax, such as `app-directive[part="drop-zone"]` would not work, as this cannot penetrate the shadow DOM.

> This is not a feature of **ny@f**; it's default Web Component behavior. We face some issues with elder browser version that don't understand the `::part` selector properly. Consider adding a polyfill if needed.

