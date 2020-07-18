import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

/**
 * Simple event handling.
 */
@CustomElement('app-buttons')
export class ButtonsComponent extends BaseComponent<{}> {
  eventData: any;

  constructor() {
    super();
  }

  clickMe(e) {
    console.log('Button Element Click ', e);
    this.eventData = e;
    super.setup();
  }

  async render() {
    return await (
      <>
        <div>
          <button type='button' n-on-Click={e => this.clickMe(e)}>
            Full expression
          </button>
          <button type='button' n-on-Click={e => this.clickMe(e)} n-async>
            Full expression
          </button>
          <button type='button' n-on-Click='clickMe'>
            No expression (Function Name)
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{JSON.stringify(this.eventData)}</pre>
      </>
    );
  }
}
