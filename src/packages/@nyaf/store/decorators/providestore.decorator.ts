import { Store } from '../store/store';

/**
 * Create the actual store in the component. Use together with @see IStore interface to have typed access.
 *
 * A typical usage scenario is shown below:
 *
 * ```typescript
 * @CustomElement('page-officematerial')
 * @ProvideStore<globalStoreType>(store)
 * export class OfficematerialPageComponent extends BaseComponent<{}> implements IStore<globalStoreType> {
 *
 * 	public store: Store<globalStoreType>;
 * 	private tabSubscriber;
 *
 * 	constructor() {
 * 		super();
 * 		this.tabSubscriber = this.store.subscribe('officeTab', (data: globalStoreType) => {
 * 			this.querySelector<TabsComponent>('#officeTabs')?.setTab(data.officeTab);
 *
 * 		});
 * 	}
 *
 * 	dispose() {
 *		if (this.tabSubscriber) {
 *			this.tabSubscriber.remove();
 *		}
 *	}
 *
 *  // parts omitted for brevity
 *
 * }
 * ```
 *
 * The @see IStore interface enforces the `store` field. The decorator actually fills it with an instance. It's safe to use immediately
 * in the constructor. Please also note the `dispose` function that is called by the backend once the component dies. It's necessary to
 * inform the subscriber to free the handler.
 *
 * @param storeType The type of the store
 * @typedef T The stores type
 */
export function ProvideStore<T>(storeType: Store<Partial<T>>) {
  return function (target: any) {
    if (!target.prototype) {
      throw new Error('Decorator must be run on an instanciable component.');
    }
    Object.defineProperty(target.prototype, 'store', {
      get: function () {
        return storeType;
      },
      enumerable: false,
      configurable: false
    });
  };
}
