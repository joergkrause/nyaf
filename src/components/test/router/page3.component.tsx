import { BaseComponent, Properties, Events } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-page3')
export class Page3Component extends BaseComponent<any> {
  constructor() {
    super();
  }

  async render() {
    return await (
      <h4>Page 3</h4>
    );
  }
}
