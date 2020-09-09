import { uuidv4 } from '@nyaf/lib';
import { Notification } from './notification.class';

export class Notif<T extends object = any> {

  constructor() {
    this._stack = new Set<Notification<T>>();
    this._proxy = new Proxy(this._stack, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, receiver): boolean {
        const value = Reflect.get(target, prop, receiver);
        value.call(target, prop);
        return true;
      }
    });
  }

  private _proxy: any;
  private _stack: Set<Notification<T>>;
  private _subscribers: Array<Function> = [];

  send(data: Notification<T>): string {
    if (!data.correlation) {
      data.correlation = uuidv4();
    }
    this._stack.add(data);
    return data.correlation;
  }

  subscribe(callback: Function): void {
    this._subscribers.push(callback);
  }

  get stack(): Set<Notification<T>> {
    return this._stack;
  }

}
