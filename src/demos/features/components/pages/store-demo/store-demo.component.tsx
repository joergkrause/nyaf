import JSX, { BaseComponent, CustomElement, Dispose, InjectService, LifeCycle } from '@nyaf/lib';
import { ProvideStore, IStore, Store } from '@nyaf/store';
import store, { globalStoreType } from './store/global.store';
import { SlotTabsComponent } from '../../slottedtabs/tabs.component';
import { HighlightService } from '../../../services/highlight.service';

@CustomElement('app-store-demo')
@ProvideStore<globalStoreType>(store)
@InjectService('highlight', HighlightService)
export class StoreDemoComponent extends BaseComponent<any> implements IStore<globalStoreType> {

  @Dispose(s => s.remove()) private readonly tabSubscriber;
  @Dispose(s => s.remove()) private readonly tabSubscriberCheckRemoving;

  constructor() {
    super();
    this.tabSubscriber = this.store.subscribe('tab', (data: globalStoreType) => {
      document.querySelector<SlotTabsComponent>('#demoTabs')?.setTab(data.tab);
    });
    this.tabSubscriberCheckRemoving = this.store.subscribe('tab', (data: globalStoreType) => {
      console.log('Tab Subscriber received change from store');
    });
  }

  store: Store<globalStoreType>;

  render() {
    return (
      <div class='container main-adjust'>
        <app-page-intro header='Store Library Demo' small='Flux based store'></app-page-intro>
        <div class='row' >
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='100'>
            <h3 class='display-4' id='store' source='validation-display'>Validation II</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info mb-5'>This demo realizes a global store that controls the tab behavior. Each component on the tab has a local store.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-store-counter id='s1' cnt={42}></app-store-counter>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
            <h3 class='display-4' id='data' source='validation-display'>Validation II</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info mb-5'>This demo realizes a global store that controls the tab behavior. Each component on the tab has a local store.</div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-store-data id='s2'></app-store-data>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
          </div>
          <div class='col-2' style='position: fixed; right: 15px;'>
            <nav id='demonav'>
              <ul class='nav flex-column'>
                <li class='nav-item'>
                  <a class='nav-link' href='#store'>Store Based Counter</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#data'>Control Data</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div >
    );
  }

  lifeCycle(lc: LifeCycle) {
    if (lc === LifeCycle.Load) {
      this.services<HighlightService>('highlight').setup(this);
    }
  }

}
