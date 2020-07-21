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
    [key: string]: any;
  };
  /**
   * Reducer are pure function calls that do the mutation.
   */
  reducer: {
    [key: string]: (state: any, payload: any) => void;
  };
  /**
   * State is the object that contains the data after mutation.
   */
  state: ST;
}
