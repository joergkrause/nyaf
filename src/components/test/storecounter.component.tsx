import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
import { ProvideStore, Store, IStore } from '@nyaf/store';
import { INC, DEC, SET, actions, counterReducer, setReducer, counterStoreType } from '../flux/flux.demo';
import { StoreParams } from '@nyaf/store/store/store.params';

// global store (assume this in the main component)
type storeStateType = { version: string };

const store = new Store<storeStateType>({
  actions: { 'version': 'version' },
  reducer: { 'version': (state, payload) => state.version = payload },
  state: { version: '' }
});

const counterStore: StoreParams<counterStoreType> = {
  actions: { INC, DEC },
  reducer: counterReducer,
  state: { counter: 0 }
};

// local store
store.mergeStore<counterStoreType>(counterStore);

const counterSetStore: StoreParams<counterStoreType> = {
  actions: { SET },
  reducer: setReducer,
  state: { counter: 0 }
};

// another local store
store.mergeStore<counterStoreType>(counterSetStore);

type allStoreTypes = storeStateType & counterStoreType;

/**
 * Shows a component that's using the store to handle the business logic outside the component.
 */
@CustomElement('app-store-counter')
@ProvideStore<allStoreTypes>(store)
@Properties<{ cnt: number }>({ cnt: 0 })
export class StoreCounterComponent extends BaseComponent<{ cnt: number }> implements IStore<allStoreTypes> {

  store: Store<allStoreTypes>;
  private sub;
  private sub2;

  constructor() {
    super();
    console.log('Store Count Ctor called');
    super.setData('cnt', 0);
    // fire if a value changes in the store, takes name of the store value
    this.sub = this.store.subscribe('counter', str => {
      console.log('Counter subscriber recveived a value', str);
      this.data.cnt = str.counter;
      console.log('***** After assigned to Proxy *****', this.data.cnt);
    });
    this.sub2 = this.store.subscribe('version', v => {
      alert(v.version);
    });
  }

  dispose() {
    if (this.sub) {
      this.sub.remove();
    }
    if (this.sub2) {
      this.sub2.remove();
    }
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

  clickMeVersion(e) {
    this.store.dispatch('version', '1.0');
  }

  async render() {
    console.log('***** Counter RENDER *****', this.data.cnt);
    const c = this.data.cnt;
    return await (
      <>
        <div>
          <button type='button' n-on-click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-click={e => this.clickMeSub(e)}>
            Sub 1
          </button>
          <button type='button' n-on-click={e => this.clickMeSet(e)}>
            Set 100
          </button>
          <button type='button' n-on-click={e => this.clickMeVersion(e)}>
            Show Version
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{c}</pre>
      </>
    );
  }
}

