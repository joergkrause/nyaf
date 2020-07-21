import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
import { ProvideStore, Store, IStore } from '@nyaf/store';
import { INC, DEC, SET } from './actions/counter.actions';
import store, { allStoreTypes } from './store/counter.store';

/**
 * Shows a component that's using the store to handle the business logic outside the component.
 */
@CustomElement('app-store-counter')
@ProvideStore<allStoreTypes>(store)
@Properties<{ cnt: number }>({ cnt: 0 })
export class StoreCounterComponent extends BaseComponent<{ cnt: number }> implements IStore<allStoreTypes> {

  store: Store<allStoreTypes>;
  private sub: { remove: () => void; };
  private sub2: { remove: () => void; };

  constructor() {
    super();
    console.log('Store Count Ctor called');
    this.store.dispatch(SET, this.data.cnt);
    // fire if a value changes in the store, takes name of the store value
    this.sub = this.store.subscribe('counter', str => {
      console.log('Counter subscriber recveived a value', str);
      this.data.cnt = str.counter;
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

  clickMeSet(e, val: number) {
    console.log('Counter Element Click SET');
    this.store.dispatch(SET, val);
  }

  clickMeVersion(e) {
    this.store.dispatch('version', '1.0');
  }

  async render() {
    console.log('***** Counter RENDER *****', this.data.cnt);
    const c = this.data.cnt;
    return await (
      <>
        <div class='row m-5'>
          <div class='col-3'>
            <button class='btn btn-md btn-success' type='button' n-on-click={e => this.clickMeAdd(e)}>
              Add 1
          </button>
          </div>
          <div class='col-3'>
            <button class='btn btn-md btn-danger' type='button' n-on-click={e => this.clickMeSub(e)}>
              Sub 1
          </button>
          </div>
          <div class='col-3'>
            <button class='btn btn-md btn-primary' type='button' n-on-click={e => this.clickMeSet(e, 100)}>
              Set 100
            </button>
            <button class='btn btn-md btn-primary' type='button' n-on-click={e => this.clickMeSet(e, 50)}>
              Set 50
            </button>
          </div>
          <div class='col-3'>
            <button class='btn btn-md btn-secondary' type='button' n-on-click={e => this.clickMeVersion(e)}>
              Show Version
          </button>
          </div>
        </div>
        <div class='row m-5'>
          <p>The value is changed in a reducer and component re-renders automatically:</p>
          <div class='badge badge-info'>{c}</div>
        </div>
      </>
    );
  }
}

