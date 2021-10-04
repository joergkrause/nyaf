import { Store } from '../store';
import { ActionKey } from '../store.params';
import { StoreState } from '../store';

describe('Store', () => {

  class StoreStateType {
    data?: number;
  }

  beforeEach(() => {

  });

  afterEach(() => {

  });

  it('instance', () => {
    const params = {
      actions: {},
      reducer: {},
      state: {}
    };
    let s: Store<StoreStateType> = null;
    const createSpy = jest.spyOn(Store.prototype as any, 'createStoreState');
    createSpy.mockImplementation(() => params);
    s = new Store<StoreStateType>(params);
    expect(s).toBeInstanceOf(Store);
    expect(createSpy).toBeCalledTimes(1);
    createSpy.mockRestore();
  });

  it('has state build', () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    expect(s).not.toBeUndefined();
    expect(s.state).not.toBeUndefined();
  });

  it('setup with string actions', () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    expect(s).toBeInstanceOf(Store);
    const expected = new Map();
    expected.set('INC', undefined);
    expected.set('DEC', undefined);
    expect(s.actions.size).toEqual(2);
    expect(s.actions).toEqual(expected);
  });

  it('setup with no actions and no reducers', () => {
    const actions = undefined;
    const reducer = undefined;
    const s = new Store({
      actions,
      reducer,
      state: {}
    });
    expect(s).toBeInstanceOf(Store);
    expect(s.actions.values.length).toEqual(0);
    expect(s.reducer.values.length).toEqual(0);
  });

  it('setup with string actions and reducers', () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {
      'INC': (state: any, payload: any): any => {
        return { data: +payload + 1 };
      },
      'DEC': (state: any, payload: any): any => {
        return { data: +payload - 1 };
      }
    };
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    expect(s).toBeInstanceOf(Store);
    expect(s.reducer.size).toEqual(2);
    expect(s.reducer.get('INC')(null, 1).data).toEqual(2);
    expect(s.reducer.get('DEC')(null, 1).data).toEqual(0);
  });

  it('setup with string actions and initial dispatch', async () => {
    const actions = {
      'INC': () => 10,
      'DEC': () => 10
    };
    const reducer = {
      'INC': (state: any, payload: any): any => {
        return { data: +state.data + +payload };
      },
      'DEC': (state: any, payload: any): any => {
        return { data: +state.data - +payload };
      }
    };
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    expect(s).toBeInstanceOf(Store);
    expect(s.reducer.size).toEqual(2);
    await s.dispatch('INC', 1);
    expect(s.state.data).toEqual(1);
    // fallback to the default (10) if no payload is provided
    await s.dispatch('DEC');
    // previous test results in +1 - 10 === -9
    expect(s.state.data).toEqual(-9);
  });

  it('publishes a change', () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const params = {
      actions,
      reducer,
      state: {
        data: 0
      }
    };
    const createSpy = jest.spyOn(Store.prototype as any, 'subscribe');
    createSpy.mockImplementation(() => params);
    const s = new Store<StoreStateType>(params);
    expect(s).toBeInstanceOf(Store);
    s.subscribe('data', () => { });
    expect(createSpy).toBeCalledTimes(1);
    createSpy.mockRestore();
  });

  it('throws error on non existing action', async () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    const createSpy = jest.spyOn(console, 'warn');
    expect(s).not.toBeUndefined();
    const r = await s.dispatch('ERROR', 1);
    expect(r).toBeFalsy();
    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith<string[]>(`Action "ERROR" doesn't exist.`);
    createSpy.mockRestore();
  });

  it('throws error on non existing reducer', async () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    const createSpy = jest.spyOn(console, 'warn');
    expect(s).not.toBeUndefined();
    const r = await s.dispatch('INC', 1);
    expect(r).toBeFalsy();
    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith<string[]>(`Reducer "INC" doesn't exist.`);
    createSpy.mockRestore();
  });

  it('has an id', async () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    expect(s.id).not.toBeUndefined();
  });


  it('has an status', async () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const s = new Store({
      actions,
      reducer,
      state: {
        data: 0
      }
    });
    expect(s.status).not.toBeUndefined();
    expect(s.status.get('INC')).toEqual(StoreState.Resting);
    expect(s.status.get('DEC')).toEqual(StoreState.Resting);
  });

  it('can merge stores', async () => {
    const actions = {
      'INC': undefined,
      'DEC': undefined
    };
    const reducer = {};
    const p1 = {
      actions,
      reducer,
      state: {
        data: 0
      }
    };
    const s = new Store(p1);
    const p2 = {
      actions: { 'SET': undefined },
      reducer,
      state: {
        state: true
      }
    };
    const mergedStore = s.mergeStore(p2);
    expect(s.actions.size).toEqual(3);
  });

});