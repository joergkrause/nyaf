import { Store } from './store';

export class Action {
  addItem(context: Store, payload: any): void {
    context.commit('addItem', payload);
  }
  clearItem(context: Store, payload: any): void {
    context.commit('clearItem', payload);
  }
}
