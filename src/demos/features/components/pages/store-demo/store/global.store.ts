import globalReducer from '../reducer/global.reducer';
import { SETTAB } from '../actions/global.actions';
import { Store } from "@nyaf/store";

export interface GlobalStore {
  tab: string;
  grid: any;
  progress: any;
}

/**
 * We export a single store type that contains all single stores as one default.
 */
export type globalStoreType = GlobalStore;

const globalState = { tab: '', grid: {}, progress: {} };

const store = new Store<globalStoreType>({
  actions: { SETTAB },
  reducer: { ...globalReducer },
  state: globalState
});

export default store;
