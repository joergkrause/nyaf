import JSX, { BaseComponent, CustomElement, ShadowDOM } from '@nyaf/lib';

@CustomElement('app-slot')
@ShadowDOM()
export class SlottedComponent extends BaseComponent<{}> {
  align: string;

  constructor() {
    super();
  }

  render() {
    return (
      <p>
        <h5><slot name='header'></slot></h5>
        <slot name='content'></slot>
      </p>
    );
  }

}
