import JSX, { BaseComponent, UseParentStyles, CustomElement, ShadowDOM } from '@nyaf/lib';
import { SlotTabComponent } from './tab.component';
import { v4 as uuidv4 } from 'uuid';

// generic box that moves content to header
@CustomElement('app-slot-tabs')
@ShadowDOM()
@UseParentStyles()
export class SlotTabsComponent extends BaseComponent<{}> {

  constructor() {
    super();
  }

  render() {
    const tabChildren = Array.prototype.slice.call(this.children).map((child) => {
      const tab = child as SlotTabComponent;
      const targetId: string = uuidv4();
      tab.targetId = targetId;
      return {
        tab,
        href: `#${targetId}`
      };
    });
    const tabTitles = tabChildren.map((tabChild: { href: string; tab: SlotTabComponent; }) => (
      <li>
        <a href={tabChild.href}>{tabChild.tab.title}</a>
      </li>
    ));
    return (
      <>
        <ul data-expand='true' data-role='materialtabs' class='pos-absolute'>
          {tabTitles}
        </ul>
        <div class='cell-12 border bd-default no-border-top'>
          <slot></slot>
        </div>
        <div class='test'>
          This is only red, if the styles are being copied, because the element is in isolated shadow DOM.
        </div>
      </>
    );
  }
}
