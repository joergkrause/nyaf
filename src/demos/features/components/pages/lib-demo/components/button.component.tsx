import JSX, { CustomElement, BaseComponent, Properties, Events } from '@nyaf/lib';

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
    this.dispatch('showAlert', checkEvent);
  }

  async render() {
    return await (
      <button type='button' class='btn btn-outline-success' n-on-click={e => this.clickMe(e)}>
        {this.data.text}
      </button>
    );
  }

  public setZero() {
    this.data.text = '0 (zero)';
  }

}
