import { Observer } from '@nyaf/lib';
import { StoreParams } from './store.params';

export class Store<ST> {
  private _actions: Map<string, any>;
  private _reducer: Map<string, (state: any, payload: any) => void>;
  private _subscribers: Map<string, { remove: () => void; }[]> = new Map();
  private _status: string;
  private state: ProxyConstructor;
  private observer: Observer;

  constructor(params: StoreParams<ST>) {
    this.observer = Observer.getInstance();
    // A status enum to set during actions and reducer
    this._status = 'resting';

    // Look in the passed params object for actions and reducer
    // that might have been passed in
    if (params.hasOwnProperty('actions')) {
      this._actions = new Map(Object.entries(params.actions));
    } else {
      this._actions = new Map<string, any>();
    }

    if (params.hasOwnProperty('reducer')) {
      this._reducer = new Map(Object.entries(params.reducer));
    } else {
      this._reducer = new Map<string, (state: any, payload: any) => void>();
    }

    this.createStoreState<ST>(params);
  }

  private createStoreState<S>(params: StoreParams<S>) {
        // Set our state to be a Proxy. We are setting the default state by
    // checking the params and defaulting to an empty object if no default
    // state is passed in
    this.state = new Proxy(params.state || {}, {
      set: (state: any, key: string, value: any) => {
        // Set the value as we would normally
        state[key] = value;
        // Trace out to the console. This will be grouped by the related action
        console.log(`stateChange: ${key.toString()}: ${value}`);
        // Publish the change event for the components that are listening
        this.observer.publish(key, this.state);
        // Give the user a little telling off if they set a value directly
        if (this._status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key.toString()}`);
        }
        // Reset the status ready for the next operation
        this._status = 'resting';

        return true;
      }
    });
  }

  /**
   * A dispatcher for actions that looks in the actions
   * collection and runs the action if it can find it
   *
   * @param {string} actionKey
   * @param {any} payload
   * @returns {boolean}
   * @memberof Store
   */
  dispatch(actionKey: string, payload: any): boolean {
    // Run a quick check to see if the action actually exists
    // before we try to run it
    if (this.actions.has(actionKey) === false) {
      console.error(`Action "${String(actionKey)} doesn't exist.`);
      return false;
    }
    // Create a console group which will contain the logs from our Proxy etc
    console.groupCollapsed(`ACTION: ${String(actionKey)}`);
    // Let anything that's watching the status know that we're dispatching an action
    this._status = 'action';
    // Actually call the action and pass it the Store context and whatever payload was passed
    const value = payload || this.actions.get(actionKey)(payload);
    // Close our console group to keep things nice and neat
    console.groupEnd();
    // forward the actions value as initial value to the reducer
    // Run a quick check to see if this mutation actually exists
    // before trying to run it
    if (this.reducer.has(actionKey) === false) {
      console.warn(`Reducer "${String(actionKey)}" doesn't exist`);
      return false;
    }
    // Let anything that's watching the status know that we're mutating state
    this._status = 'mutation';
    // Get a new version of the state by running the mutation
    this.reducer.get(actionKey)(this.state, value);
    // Merge the old and new together to create a new state and set it
    return true;
  }

  /**
   * Subscribe here for store changes. Don't forget to call `remove` on dispose.
   * */
  subscribe(actionKey: string, cb: (value: any) => void): { remove: () => void; } {
    const s = this.observer.subscribe(actionKey, cb);
    if (!this._subscribers.get(actionKey)) {
      this._subscribers.set(actionKey, []);
    }
    const a = this._subscribers.get(actionKey);
    const idx = a.push(s);
    this._subscribers.set(actionKey, a);
    return {
      remove: () => {
        s.remove();
        a.splice(idx - 1, 1);
      }
    };
  }

  dispose(specific?: string) {
    if (specific) {
      // TODO
    } else {
      this._subscribers.forEach(s => s.forEach(a => a.remove()));
      this._subscribers = new Map();
    }
  }

  /**
   * Merge this store with another one. This is useful to have distributed definitions, sub-stores per component actually,
   * but can still work with one single global store - the single source of truth.
   *
   * @param store Another stores definitions.
   */
  mergeStore<T>(store: StoreParams<T>): void {
    for (const action of Object.entries(store.actions)) {
      const [key, payload] = action;
      if (this._actions.get(key)) {
        throw new Error(`Action ${key} already exists`);
      }
      this._actions.set(key, payload);
    }
    for (const reducer of Object.entries(store.reducer)) {
      const [key, func] = reducer;
      if (this._reducer.get(key)) {
        throw new Error(`Reducer for action ${key} already exists`);
      }
      this._reducer.set(key, func);
    }
    this.createStoreState<T>(store);
  }

  get status() {
    return this._status;
  }

  get actions() {
    return this._actions;
  }

  get reducer() {
    return this._reducer;
  }

}
