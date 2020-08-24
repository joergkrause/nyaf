import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
import { ProvideStore, Store, IStore, Updates } from '@nyaf/store';
import { INC, DEC, SET } from './actions/counter.actions';
import store, { allStoreTypes } from './store/counter.store';
import { Effects } from '@nyaf/store/decorators/effects.decorator';

/**
 * Shows a component that's using the store to handle the business logic outside the component.
 */
@CustomElement('app-store-updates')
@ProvideStore<allStoreTypes>(store)
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
@Updates<allStoreTypes>([
  {
    store: 'counter',
    selector: '[data-store-counter]',
    target: 'textContent'
  }
])
export class StoreUpdatesComponent extends BaseComponent<any> implements IStore<allStoreTypes> {

  store: Store<allStoreTypes>;

  constructor() {
    super();
    console.log('Store Updates Ctor called');
  }

  async render() {
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
          <div class='badge badge-info' data-store-counter>n/a</div>
        </div>
      </>
    );
  }
}

