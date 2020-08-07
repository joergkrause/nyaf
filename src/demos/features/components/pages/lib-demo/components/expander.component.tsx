import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';

import { Expander, Expand } from '@nyaf/lib';

@Expand('danger-button')
export class ButtonExpander extends Expander  {
  constructor() {
    super();
  }
  class = 'btn btn-sm btn-danger';
  type = 'button';
}


@CustomElement('app-expander')
export class ExpanderComponent extends BaseComponent<any> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <button n-expand='danger-button'>Expanded attributes</button>
    );
  }

}
