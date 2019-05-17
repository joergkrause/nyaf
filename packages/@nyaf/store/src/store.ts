import { Action } from './action';
import { Observer } from '@nyaf/lib';

export class Store {
  persist: boolean;
  observer: Observer;

  constructor() {
    this.observer = Observer.getInstance();
  }

  update(action: Action) {
    this.observer.publish(action.type, action.payload);
  }

  subscribe(type: string): Promise<any> {
    const f = payload => {
      return payload;
    };
    const p = new Promise(f);
    this.observer.subscribe(type, f);
    return p;
  }
}
