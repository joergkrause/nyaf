import JSX, { BaseComponent, CustomElement, Dispose } from '@nyaf/lib';
import { ProvideStore, IStore, Store } from '@nyaf/store';
import store, { globalStoreType } from './store/global.store';
import { SlotTabsComponent } from '../../slottedtabs/tabs.component';

@CustomElement('app-store-demo')
@ProvideStore<globalStoreType>(store)
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

  // dispose() {
  //   if (this.tabSubscriber) {
  //     this.tabSubscriber.remove();
  //   }
  //   if (this.tabSubscriberCheckRemoving) {
  //     this.tabSubscriberCheckRemoving.remove();
  //   }
  // }

  render() {
    return (
      <div style='position: relative; top: 30px;' class='container'>
        <style>
          {`nav {
            background-color: black !important;
          }
          footer {
            position: fixed;
            width: 100%;
            bottom: 0;
          }
          `}
        </style>
        <div class='row' style='position: fixed; margin-top:8px; background-color: white; z-index: 1000; width: 100%;'>
          <div class='col'>
            <div class='display-3 mt-10' style='box-shadow: 5px 5px 20px grey;'>Store Demo
            <small style='font-size:30%; display: block;'>Flux based store</small></div>
          </div>
        </div>
        <div class='row' style='position: relative; margin-top: 50px; top:125px'>
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='100'>
            <h3 class='display-4' id='tabs'>Tabs</h3>
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
          </div>
          <div class='col-2'>
            NAV
          </div>
        </div>
      </div>
    );
  }

}
