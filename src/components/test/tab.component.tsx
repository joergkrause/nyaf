import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

export interface TabProps {
  title: string;
  content: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-tab')
export class TabComponent extends BaseComponent<{}> {
  public props: TabProps;

  constructor() {
    super();
    this.props = {
      title: super.readAttribute('title', 'Tab Title'),
      content: super.readAttribute('content', 'Tab content')
    };
  }

  render() {
    return (
      <li class="nav nav-tabs" id="header-tabs" n-if={this.props.title !== 't1'}>
        {this.props.title} <small>{this.props.content}</small>
      </li>
    );
  }
}
