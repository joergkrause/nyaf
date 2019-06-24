import { Observer } from '@nyaf/lib';

export interface StoreParams {
  actions: { [key: string]: (payload: any) => void; };
  mutations: { [key: string]: (state: any, payload: any) => void };
  state: any;
}

export class Store extends Observer {
  private actions: { [key: string]: (payload: any) => void; };
  private mutations: { [key: string]: (state: any, payload: any) => void };
  private _status: string;
  private state: any;

  constructor(params: StoreParams) {
    super();
    // A status enum to set during actions and mutations
    this._status = 'resting';

    // Look in the passed params object for actions and mutations
    // that might have been passed in
    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    } else {
      this.actions = {};
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    } else {
      this.mutations = {};
    }

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
        super.publish(key, this.state);
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
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
    // Create a console group which will contain the logs from our Proxy etc
    console.groupCollapsed(`ACTION: ${actionKey}`);
    // Let anything that's watching the status know that we're dispatching an action
    this._status = 'action';
    // Actually call the action and pass it the Store context and whatever payload was passed
    const value = payload || this.actions[actionKey](payload);
    // Close our console group to keep things nice and neat
    console.groupEnd();
    // forward the actions value as initial value to the reducer
    // Run a quick check to see if this mutation actually exists
    // before trying to run it
    if (typeof this.mutations[actionKey] !== 'function') {
      console.log(`Mutation "${actionKey}" doesn't exist`);
      return false;
    }
    // Let anything that's watching the status know that we're mutating state
    this._status = 'mutation';
    // Get a new version of the state by running the mutation and storing the result of it
    const newState = this.mutations[actionKey](this.state, value);
    // Merge the old and new together to create a new state and set it
    this.state = Object.assign(this.state, newState);
    return true;
  }

  get status() {
    return this._status;
  }

}
