import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

// Step 1: Create the Components active parts
@CustomElement('app-counter')
export class CounterComponent extends BaseComponent<{ cnt: number }> {
  eventData: any;

  constructor() {
    super();
    super.setData('cnt',  10);
  }

  clickMeAdd(v: number) {
    console.log('Counter Element Click');
    super.setData('cnt', super.data.cnt + 1);
  }

  clickMeSub(v: number) {
    console.log('Counter Element Click');
    super.setData('cnt', super.data.cnt - 1);
  }


  render() {
    return (
      <>
        <div>
          <button type='button' n-on-Click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-Click={e => this.clickMeSub(e)} n-async>
            Sub 1
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{ super.data.cnt }</pre>
      </>
    );
  }
}
