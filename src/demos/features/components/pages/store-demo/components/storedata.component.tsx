import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';
import { ProvideStore, IStore, Store } from '@nyaf/store';

import store, { globalStoreType } from '../store/global.store';
import { SETTAB } from '../actions/global.actions';

/**
 * Shows a component that's using the store to handle the business logic outside the component.
 */
@CustomElement('app-store-data')
@ProvideStore<globalStoreType>(store)
export class StoreDataComponent extends BaseComponent<{ cnt: number }> implements IStore<globalStoreType>  {

  constructor() {
    super();
  }

  store: Store<globalStoreType>;

  tabSwitch(e: Event) {
    this.store.dispatch(SETTAB, 'd1');
  }

  async render() {
    return await (
      <div class='row m-2'>
        <div class='col'>
          <div class='alert alert-info'>
            Nothing in here...the real purpose is to invoke the global store to change the tab back to first one.
             <br></br>
            <button class='btn btn-outline-dark' n-on-click={this.tabSwitch}>Switch TAB</button>
          </div>
        </div>
      </div>
    );
  }
}
