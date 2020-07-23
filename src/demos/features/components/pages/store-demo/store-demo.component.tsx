import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';
import { ProvideStore, IStore, Store } from '@nyaf/store';
import store, { globalStoreType } from './store/global.store';
import { SlotTabsComponent } from '../../slottedtabs/tabs.component';


@CustomElement('app-store-demo')
@ProvideStore<globalStoreType>(store)
export class StoreDemoComponent extends BaseComponent<any> implements IStore<globalStoreType> {

  private readonly tabSubscriber;
  private readonly tabSubscriberCheckRemoving;

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

  dispose() {
    if (this.tabSubscriber) {
      this.tabSubscriber.remove();
    }
    if (this.tabSubscriberCheckRemoving) {
      this.tabSubscriberCheckRemoving.remove();
    }
  }

  render() {
    return (
      <>
        <div class='card'>
          <div class='card-header'>Store Demo</div>
          <div class='card-body'>
            <blockquote class='blockquote mb-0'>
              <p>This demo realizes a global store that controls the tab behavior. Each component on the tab has a local store.</p>
              <footer class='blockquote-footer'>This demo uses a tab component to navigate and <cite title='@nyaf/store'>@nyaf/store</cite> library </footer>
            </blockquote>
            <div class='row mt-2'>
              <div class='col'>
                <app-slot-tabs id='demoTabs'>
                  <app-slot-tab title='Store Counter' id='d1'>
                    <app-store-counter id='s1' cnt={42}></app-store-counter>
                  </app-slot-tab>
                  <app-slot-tab title='Store Data' id='d2'>
                    <app-store-data id='s2'></app-store-data>
                  </app-slot-tab>
                </app-slot-tabs>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}
