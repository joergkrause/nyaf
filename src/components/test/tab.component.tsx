import { BaseComponent, ComponentData, Properties } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

export interface TabProps {
  title: string;
  content: string;
  active: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tab')
@Properties({ title: '', content: '', active: false })
export class TabComponent extends BaseComponent<TabProps> {
  constructor() {
    super();
  }

  render() {
    const tabClass = 'nav-link ' + (super.data.active === super.data.title ? 'active' : '');
    return (
      <li class='nav-item' n-if={super.data.title !== 't1'}>
        <a class={tabClass} href='#'>
          {' '}
          {super.data.title} <small>{super.data.content}</small>
        </a>
      </li>
    );
  }
}
