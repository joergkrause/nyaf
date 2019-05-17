import { Store } from './store';
import { Action } from './action';

/**
 * The service that manages stores. Stores are the sinmgle point of truth for an application.
 * Ideally, you have just one, but it's possible to add more if the application gets more complex.
 */
export class StoreService {

  /**
   * Don't use instances, @see getInstance for details about using Singleton classes.
   */
  constructor(s: any) {
    if (s) {
      throw new Error('StoreService is Singleton, don\'t call the ctor');
    }
  }

  get store(): Store[] {
    return this._stores;
  }
  private static _instance: StoreService;

  private _stores: Store[];

  static getInstance(): StoreService {
    if (!StoreService._instance) {
      StoreService._instance = new StoreService(void 0);
    }
    return StoreService._instance;
  }

  register(store: Store) {
    this._stores.push(store);
  }

  subscribe(action: Action) {}

  dispatch(action: Action) {
    if (this._stores.length > 0) {
      this._stores.forEach(entry => {
        entry.update(action);
      });
    }
  }
}
