export interface StoreParams<ST> {
  actions: {
    [key: string]: any;
  };
  reducer: {
    [key: string]: (state: any, payload: any) => void;
  };
  state: ST;
}
