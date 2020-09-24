/**
 * A helper type to allows `Symbol()` as a identifier for actions.
 */
export type ActionKey = string | symbol;

/**
 * To define the parts that make a store.
 * Actions are just keys to invoke a mutation.
 * Reducer are pure function calls that do the mutation.
 * State is the object that contains the data after mutation.
 */
export interface StoreParams<ST> {
  /**
   * Actions are just keys to invoke a mutation.
   */
  actions: {
    [key in ActionKey]: any;
  };
  /**
   * Reducer are pure function calls that do the mutation.
   */
  reducer: {
    [key in ActionKey]: (state: any, payload: any) => void;
  };
  /**
   * State is the object that contains the data after mutation.
   */
  state: ST;
}
