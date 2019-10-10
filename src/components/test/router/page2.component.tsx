import { BaseComponent, Properties, Events } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-page2')
export class Page2Component extends BaseComponent<any> {
  constructor() {
    super();
  }

  render() {
    return (
      <h4>Page 2</h4>
    );
  }
}
