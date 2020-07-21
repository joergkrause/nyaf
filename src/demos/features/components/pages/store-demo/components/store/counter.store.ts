import { Store, StoreParams } from '@nyaf/store';
import { counterReducer, setReducer } from '../reducer/counter.reducer';
import { INC, DEC, SET } from '../actions/counter.actions';

/**
 * A store contains a data structure that helds up to the entire app's state.
 * It can have any complexity, from a single value up to deep nested objects.
 */
interface CounterStore {
  counter: number;
}

/**
 * We export a single store type that contains all single stores as one default.
 */
export type counterStoreType = CounterStore;

// global store (assume this in the main component)
type storeStateType = { version: string };

const store = new Store<storeStateType>({
  actions: { 'version': 'version' },
  reducer: { 'version': (state, payload) => state.version = payload },
  state: { version: '' }
});

const counterStore: StoreParams<counterStoreType> = {
  actions: { INC, DEC },
  reducer: counterReducer,
  state: { counter: 0 }
};

// local store
store.mergeStore<counterStoreType>(counterStore);

const counterSetStore: StoreParams<counterStoreType> = {
  actions: { SET },
  reducer: setReducer,
  state: { counter: 0 }
};

// another local store
store.mergeStore<counterStoreType>(counterSetStore);

export type allStoreTypes = storeStateType & counterStoreType;

export default store;
