
export interface DemoTitleStore {
  title: string;
}

/**
 * A store contains a data structure that helds up to the entire app's state.
 * It can have any complexity, from a single value up to deep nested objects.
 */
export interface CounterStore {
  counter: number;
}

/**
 * We export a single store type that contains all single stores as one default.
 */
type store = CounterStore & DemoTitleStore;

export default store;
