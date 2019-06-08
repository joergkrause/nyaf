import { BaseComponent, Properties, Events } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

interface ButtonPropType {
  text: string;
}

// Step 1: Create the Components active parts
@CustomElement('app-button')
@Properties<ButtonPropType>({ text: '' })
@Events(['showAlert'])
export class ButtonComponent extends BaseComponent<ButtonPropType> {
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
      <button type="button" n-on-click={e => this.clickMe(e)}>
        {super.data.text}
      </button>
    );
  }
}
