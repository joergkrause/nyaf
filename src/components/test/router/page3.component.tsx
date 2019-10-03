import { BaseComponent, Properties, Events } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-page3')
@Events(['showAlert'])
export class Page3Component extends BaseComponent<any> {
  constructor() {
    super();
  }

  clickMe(e) {
    console.log('Button Element Click ', e);
    const checkEvent = new CustomEvent('showAlert', {
      bubbles: true,
      cancelable: false
    });
    super.dispatchEvent(checkEvent);
  }

  render() {
    return (
      <h4>Page 3</h4>
    );
  }
}
