import { Action } from './action';
import { Observer } from 'nyaf';

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
    var f = (payload) => {
      return payload;
    };
    var p = new Promise(f);
    this.observer.subscribe(type, f);
    return p;
  }

}