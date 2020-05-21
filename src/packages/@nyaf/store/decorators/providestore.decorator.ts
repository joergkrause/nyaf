import { Store } from '../store/store';

// interface Type<T> extends Function {
//   new (...args: any[]): T
// }

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
