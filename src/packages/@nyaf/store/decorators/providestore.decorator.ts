import { Store } from '../store/store';

/**
 * Create the actual store in the component. Use together with @see IStore interface to have typed access.
 * @param storeType The type of the store
 * @typedef T The stores type
 */
export function ProvideStore<T>(storeType: Store<Partial<T>>) {
  return function(target: any) {
    if (!target.prototype) {
      throw new Error('Decorator must be run on an instanciable component.');
    }
    Object.defineProperty(target.prototype, 'store', {
      get: function() {
        return storeType;
      }
    });
  };
}
