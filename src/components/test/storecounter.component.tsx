import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { Store } from '@nyaf/store';

const store = new Store({
  actions: {
    INC: () => (1), // initial value of payload
    DEC: () => (-1),
    SET: () => 0
  },
  mutations: {
    // get state, modify, return
    INC: (state, payload) => {
      state.counter = state.counter + payload;
      return state;
    },
    DEC: (state, payload) => {
      state.counter = state.counter + payload;
      return state;
    },
    SET: (state, payload) => {
      state.counter = payload;
      return state;
    }
  },
  state: {
    counter: 0
  }
});

// Step 1: Create the Components active parts
@CustomElement('app-store-counter')
export class StoreCounterComponent extends BaseComponent<{ cnt: number }> {

  constructor() {
    super();
    super.setData('cnt', 10);
    // fire if a value changes in the store, takes name of the store value
    store.subscribe('counter', str => {
      super.setData('cnt', str.counter);
    });
  }

  clickMeAdd(e) {
    console.log('Counter Element Click INC');
    store.dispatch('INC', super.data.cnt);
  }

  clickMeSub(e) {
    console.log('Counter Element Click DEC');
    store.dispatch('DEC', super.data.cnt);
  }

  clickMeSet(e) {
    console.log('Counter Element Click SET');
    store.dispatch('SET', 100);
  }

  render() {
    return (
      <>
        <div>
          <button type="button" n-on-Click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type="button" n-on-Click={e => this.clickMeSub(e)} n-async>
            Sub 1
          </button>
          <button type="button" n-on-Click={e => this.clickMeSet(e)} n-async>
            Set 100
          </button>        </div>
        <pre style="border: 1px solid gray;">{super.data.cnt}</pre>
      </>
    );
  }
}
