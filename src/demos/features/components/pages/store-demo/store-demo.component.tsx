import JSX, { BaseComponent, CustomElement, Dispose, InjectService, LifeCycle } from '@nyaf/lib';
import { ProvideStore, IStore, Store } from '@nyaf/store';
import store, { globalStoreType } from './store/global.store';
import { SlotTabsComponent } from '../../slottedtabs/tabs.component';
import { HighlightService } from '../../../services/highlight.service';

import hljs from 'highlight.js';

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
            <h3 class='display-4' id='store' source='storecounter'>Preparation</h3>
            <p>
              All demos use the following code to define the store's active parts:
            </p>
            <h4>Actions</h4>
            <p>Global Actions - used in almost all components and not logical bound.
            </p>
            <pre><code>
              export const SETTAB = 'SETTAB';
            </code></pre>
            <p>Local Actions - used in one component for specific purpose.
            </p>
            <pre><code>
/**@@
 * Action definition for the increment task.@@
              */@@
              export const INC = 'INC';@@
              /**@@
              * Action definition for the decrement task.@@
              */@@
              export const DEC = 'DEC';@@
              /**@@
              * Action definition for the set task.@@
              */@@
              export const SET = 'SET';@@
              @@
              /**@@
              * The defaults that we use in case a reducer doesn'Ä't exists. This usually set's a default. It's mandatory.@@
              */@@
export const actions = {'{'}@@
  [INC]: () =&gt; 1, // initial value of payload@@
  [DEC]: () =&gt; -1,@@
  [SET]: () =&gt; 0@@
{'}'};@@
            </code></pre>
            <h4>Reducer</h4>
            <p>The global reducer all components can invoke.</p>
            <pre><code>
              import {'{'} SETTAB {'}'} from '../actions/global.actions';@@
import {'{'} globalStoreType {'}'} from '../store/global.store';@@
@@
/**@@
 * The reducer functions are the executing logic. They "do" what the action is asking for.@@
 */@@
export default {'{'}@@
  [SETTAB]: async (state: globalStoreType, payload: string) =&gt; {'{'}@@
    return {'{'} tab: payload {'}'};@@
  {'}'}@@
{'}'};@@
            </code></pre>
            <p>The local reducer.</p>
            <pre><code>
import {'{'} counterStoreType {'}'} from '../store/counter.store';@@
import {'{'} INC, DEC, SET {'}'} from '../actions/counter.actions';@@
@@
/**@@
 * The reducer functions are the executing logic. They "do" what the action is asking for.@@
 */@@
export const counterReducer = {'{'}@@
  /**@@
   * The increment action takes the current state, operates as requested and returns the state for storage.@@
   */@@
  [INC]: (state: counterStoreType, payload: number): Partial&lt;counterStoreType&gt; =&gt; {'{'}@@
    const counter = state.counter + payload;@@
    return {'{'} counter {'}'};@@
  {'}'},@@
  /**@@
   * The decrement action takes the current state, operates as requested and returns the state for storage.@@
   */@@
  [DEC]: (state: counterStoreType, payload: number): Partial&lt;counterStoreType&gt; =&gt; {'{'}@@
    const counter = state.counter - payload;@@
    return {'{'} counter {'}'};@@
  {'}'}@@
{'}'};@@
@@
export const setReducer = {'{'}@@
  [SET]: (state: counterStoreType, payload: number): Partial&lt;counterStoreType&gt; =&gt; {'{'}@@
    const counter = payload;@@
    return {'{'} counter {'}'};@@
  {'}'}@@
{'}'};
            </code></pre>
            <h4>Store and Store Types</h4>
            <p>The local store with merge instructions</p>
            <pre><code>
import {'{'} Store, StoreParams {'}'} from '@nyaf/store';@@
import {'{'} counterReducer, setReducer {'}'} from '../reducer/counter.reducer';@@
import {'{'} INC, DEC, SET {'}'} from '../actions/counter.actions';@@
@@
/**@@
 * A store contains a data structure that helds up to the entire app's state.@@
 * It can have any complexity, from a single value up to deep nested objects.@@
 */@@
interface CounterStore {'{'}@@
  counter: number;@@
{'}'}@@
@@
/**@@
 * We export a single store type that contains all single stores as one default.@@
 */@@
export type counterStoreType = CounterStore;@@
@@
// global store (assume this in the main component)@@
type storeStateType = {'{'} version: string {'}'};@@
@@
const store = new Store&lt;storeStateType&gt;({'{'}@@
  actions: {'{'} 'version': 'version' {'}'},@@
  reducer: {'{'} 'version': (state, payload) =&gt; state.version = payload {'}'},@@
  state: {'{'} version: ''{'}'}@@
{'}'});@@
@@
const counterStore: StoreParams&lt;counterStoreType&gt; = {'{'}@@
  actions: {'{'} INC, DEC &rbrace;,@@
  reducer: counterReducer,@@
  state: {'{'} counter: 0 &rbrace;@@
{'}'};@@
@@
// local store@@
store.mergeStore&lt;counterStoreType&gt;(counterStore);@@
@@
const counterSetStore: StoreParams&lt;counterStoreType&gt;= {'{'}@@
  actions: {'{'} SET {'}'},@@
  reducer: setReducer,@@
  state: {'{'} counter: 0 {'}'}@@
{'}'};@@
@@
// another local store@@
store.mergeStore&lt;counterStoreType&gt;(counterSetStore);@@
@@
export type allStoreTypes = storeStateType &amp; counterStoreType;@@
@@
export default store;
            </code></pre>
            <h3 class='display-4' id='store' source='storecounter'>Simple Store</h3>
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
            <h3 class='display-4' id='data' source='storedata'>Store with Data</h3>
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
                  <a class='nav-link' href='#store'>Simple Store</a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#data'>Store with Data</a>
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
      this.querySelectorAll('pre code').forEach((block: HTMLElement) => {
        block.textContent = block.textContent.replace(/@@/g, '\r\n');
        hljs.highlightBlock(block);
      });
    }
  }

}
