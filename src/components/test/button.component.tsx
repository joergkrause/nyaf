import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

// Step 1: Create the Components active parts
@CustomElement('app-button')
export class ButtonComponent extends BaseComponent<{}> {
  eventData: any;

  protected getData(): ComponentData {
    return null;
  }

  constructor() {
    super();
  }

  clickMe(e) {
    console.log('Button Element Click ', e);
    this.eventData = e;
    super.setup();
  }

  render() {
    return (
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
