import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { Store, Action, Mutations } from '@nyaf/store';

const store = new Store({
  actions: new Action(),
  mutations: new Mutations()
});

// Step 1: Create the Components active parts
@CustomElement('app-store-counter')
export class StoreCounterComponent extends BaseComponent<{ cnt: number }> {
  eventData: number;
 
  constructor() {
    super();
    super.setData('cnt',  10);
    store.subscribe('COUNTER', (data) => {
      this.eventData = data;
      super.setData('cnt', data);
    });
  }

  clickMeAdd(v: number) {
    console.log('Counter Element Click');
    store.dispatch('COUNT', this.eventData + 1);
  }

  clickMeSub(v: number) {
    console.log('Counter Element Click');
    store.dispatch('COUNT', this.eventData - 1);
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
