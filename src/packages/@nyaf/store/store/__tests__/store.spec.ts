import { Store } from '../store';
import { isFunction } from 'util';

describe('Store', () => {

  it('instance', () => {
    const s = new Store({
      actions: [],
      reducer: {},
      state: {}
    });
  });
});