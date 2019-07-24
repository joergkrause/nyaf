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
    this.props = {
      title: super.readAttribute('title', 'Tab Title'),
      content: super.readAttribute('content', 'Tab content'),
      content: super.readAttribute('active', 'active')
    };
  }

  render() {
    const tabClass = 'nav-link ' + this.props.active;
    return (
      <li class='nav-item' n-if={this.props.title !== 't1'}>
        <a class={tabClass} href='#'>
          {' '}
          {this.props.title} <small>{this.props.content}</small>
        </a>
      </li>
    );
  }
}
