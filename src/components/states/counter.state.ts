
export interface DemoTitleStore {
  title: string;
}

export interface CounterStore {
  counter: number;
}

type store = CounterStore & DemoTitleStore;

export default store;
