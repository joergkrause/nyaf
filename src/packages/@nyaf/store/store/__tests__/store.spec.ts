import { Store } from '../store';

describe('Store', () => {

  it('instance', () => {
    const s = new Store({
      actions: [],
      reducer: {},
      state: {}
    });
    expect(s).toBeInstanceOf(Store);
  });

});