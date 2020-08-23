import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
import { ProvideStore, Store, IStore } from '@nyaf/store';
import { INC, DEC, SET } from './actions/counter.actions';
import store, { allStoreTypes } from './store/counter.store';
import { Effects } from '@nyaf/store/decorators/effects.decorator';

/**
 * Shows a component that's using the store to handle the business logic outside the component.
 */
@CustomElement('app-store-effects')
@ProvideStore<allStoreTypes>(store)
@Properties<{ cnt: number }>({ cnt: 0 })
@Effects([
  {
    selector: 'button[data-action="ADD"]',
    trigger: 'click',
    parameter: (e) => (e.target as HTMLElement).dataset.payload || 1,
    action: INC
  },
  {
    selector: 'button[data-action="SUB"]',
    trigger: 'click',
    parameter: (e) => (e.target as HTMLElement).dataset.payload || 1,
    action: DEC
  },
  {
    selector: 'button[data-action="SET"]',
    trigger: 'click',
    parameter: (e) => +(e.target as HTMLElement).dataset.payload,
    action: SET
  }
])
// @Updates<allStoreTypes>([
//   {
//     value: 'counter',
//     target: (v: any) => this.data.cnt = v
//   }
// ])
export class StoreEffectsComponent extends BaseComponent<{ cnt: number }> implements IStore<allStoreTypes> {

  store: Store<allStoreTypes>;
  private sub: { remove: () => void; };
  private sub2: { remove: () => void; };

  constructor() {
    super();
    console.log('Store Effects Ctor called');
    this.store.dispatch(SET, this.data.cnt);
    // fire if a value changes in the store, takes name of the store value
    this.sub = this.store.subscribe('counter', str => {
      console.log('Counter subscriber recveived a value', str);
      this.data.cnt = str.counter;
      return true;
    });
    this.sub2 = this.store.subscribe('version', v => {
      alert(v.version);
      return true;
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

  async render() {
    const c = this.data.cnt;
    return await (
      <>
        <div class='row m-5'>
          <div class='col-3'>
            <button class='btn btn-md btn-success' type='button' data-action='ADD'>
              Add 1
          </button>
          </div>
          <div class='col-3'>
            <button class='btn btn-md btn-danger' type='button' data-action='SUB'>
              Sub 1
          </button>
          </div>
          <div class='col-3'>
            <button class='btn btn-md btn-primary' type='button' data-action='SET' data-payload='100'>
              Set 100
            </button>
            <button class='btn btn-md btn-primary' type='button' data-action='SET' data-payload='50'>
              Set 50
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

