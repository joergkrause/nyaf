import { BaseComponent, ComponentData } from '@nyaf/lib';
import { Store } from '../store/store';

/**
 * A store enabled component that provides an additional generic property to easy access to store.
 */
export abstract class StoreComponent<S, P extends ComponentData = {}> extends BaseComponent<P> {
  constructor() {
    super();
  }

  /**
   * Derived components access the store to dispatch actions and subscribe store changes.
   * Use the @see {Store} decorator to set the actual store instance with active reducrers.
   */
  protected store: Store<S>;

  abstract render();
}
