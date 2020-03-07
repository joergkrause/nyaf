import { BaseComponent, Properties, Events } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

interface ButtonPropType  {
  text: string;
}

/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-button')
@Properties<ButtonPropType>({ text: '' })
@Events(['showAlert'])
export class ButtonComponent extends BaseComponent<ButtonPropType> {

  clickMe(e) {
    console.log('Button Element Click ', e);
    const checkEvent: CustomEventInit = {
      bubbles: true,
      cancelable: false,
      detail: {
        customData: 12345
      }
    };
    console.log('Dispatch Custom Event ', checkEvent);
    super.dispatch('showAlert', checkEvent);
  }

  render() {
    return (
      <button type='button' n-on-click={e => this.clickMe(e)}>
        {this.data.text}
      </button>
    );
  }

}
