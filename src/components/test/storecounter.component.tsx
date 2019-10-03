import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';
import { ProvideStore, Store, StoreComponent } from '@nyaf/store';
import counterReducer from '../reducer/counter.reducer';
import setReducer from '../reducer/set.reducer';
import counterActions, { INC, DEC, SET } from '../actions/counter.action';
import storeStateType from '../states/counter.state';

const store = new Store<storeStateType>({
  actions: counterActions,
  reducer: { ...counterReducer, ...setReducer  },
  state: { counter: 0, title: '' }
});

/**
 * Shows a component that's using the store to handle the business logic outside the component.
 */
@CustomElement('app-store-counter')
@ProvideStore<storeStateType>(store)
export class StoreCounterComponent extends StoreComponent<storeStateType, { cnt: number }> {
  constructor() {
    super();
    super.setData('cnt', 0);
    // fire if a value changes in the store, takes name of the store value
    this.store.subscribe('counter', str => {
      super.setData('cnt', str.counter);
    });
  }

  clickMeAdd(e) {
    console.log('Counter Element Click INC');
    this.store.dispatch(INC, 1);
  }

  clickMeSub(e) {
    console.log('Counter Element Click DEC');
    this.store.dispatch(DEC, 1);
  }

  clickMeSet(e) {
    console.log('Counter Element Click SET');
    this.store.dispatch(SET, 100);
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
          <button type='button' n-on-Click={e => this.clickMeSet(e)} n-async>
            Set 100
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{super.data.cnt}</pre>
      </>
    );
  }
}
