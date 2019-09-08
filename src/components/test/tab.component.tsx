import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

export interface TabProps {
  title: string;
  content: string;
  active: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tab')
export class TabComponent extends BaseComponent<{ current: string }> {
  public props: TabProps;

  constructor() {
    super();
    super.props = {
      title: super.readAttribute('title', 'Tab Title'),
      content: super.readAttribute('content', 'Tab content'),
      active: super.readAttribute('active', 'active')
    };
  }

  render() {
    const tabClass = 'nav-link ' + super.props.active;
    return (
      <li class='nav-item' n-if={super.props.title !== 't1'}>
        <a class={tabClass} href='#'>
          {' '}
          {super.props.title} <small>{super.props.content}</small>
        </a>
      </li>
    );
  }
}
