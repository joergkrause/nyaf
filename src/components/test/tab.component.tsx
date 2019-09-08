import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

export interface TabProps {
  title: string;
  content: string;
  active: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tab')
export class TabComponent extends BaseComponent<TabProps> {

  constructor() {
    super();
    super.data.title = super.readAttribute('title', 'Tab Title');
    super.data.content = super.readAttribute('content', 'Tab content');
    super.data.active = super.readAttribute('active', 'active');
  }

  render() {
    const tabClass = 'nav-link ' + super.data.active;
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
