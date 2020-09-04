import { BaseComponent, ComponentData } from '@nyaf/lib';
import { Store } from '../store/store';

/**
 * Implement this interface to have typed access to your store. Merge stores to make multiple stores available
 * in one component. This interface is just a helper that makes using the store easier in TypeScript. To get
 * a real store instance, decorate your component with {@link ProvideStore} decorator. There is no other assignemnt
 * or instantiation required. The decorator will create and assign the instance.
 */
export interface IStore<S extends object> {
  store: Store<S>;
}

