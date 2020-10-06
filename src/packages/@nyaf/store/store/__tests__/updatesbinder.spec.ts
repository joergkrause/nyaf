import { BaseComponent } from '@nyaf/lib';
import { UpdatesBinder } from '../updatesbinder.class';
import { Updates } from '../../decorators/updates.decorator';
import { IStore } from '../../interfaces/store.interface';
import { Store } from '../store';
import { StoreParams } from '../store.params';
import { ProvideStore } from '../../decorators/providestore.decorator';

describe('Updates Binder', () => {

  type testStoreType = { field: any };
  const testAction = 'TEST';
  const testReducer = {
    [testAction]: (state: testStoreType, payload: any) => {
      return { field: payload };
    }
  };
  const testStore = new Store<testStoreType>({
    actions: { testAction },
    reducer: testReducer,
    state: { field: null }
  });

  @Updates([
    {
      selector: '#target',
      store: 'counter',
      target: 'input'
    }
  ])
  @ProvideStore<testStoreType>(testStore)
  class TestComponent extends BaseComponent<any> implements IStore<testStoreType> {
    constructor() {
      super();
    }
    store: Store<any>;
    render() {
      return '';
    }
  }

  class TestLifeCycleComponent extends BaseComponent<any> {
    constructor() {
      super();
    }
    render(): any {
      return '';
    }
  }

  @Updates([
    {
      selector: '#target',
      store: 'counter',
      target: 'input'
    }
  ])  class TestNoStoreComponent extends BaseComponent<any> {
    constructor() {
      super();
    }
    render(): any {
      return '';
    }
  }


  it('no instance without init', () => {
    const el = document.createElement('div');
    const e = UpdatesBinder.getInstance(el);
    // no initialized
    expect(e).toBeUndefined();
  });

  it('instance with init', () => {
    customElements.define('updates-test', TestComponent);
    const el = document.createElement('updates-test');
    document.body.innerHTML = '<updates-test></updates-test>';
    const c = document.querySelector<HTMLElement>('updates-test') as BaseComponent;
    UpdatesBinder.initialize(c);
    const e = UpdatesBinder.getInstance(c);
    // no initialized
    expect(e).not.toBeUndefined();
  });


  it('initiates on lifecycle event', () => {
    const c = document.querySelector<HTMLElement>('updates-test') as BaseComponent;
    UpdatesBinder.initialize(c);
    const e = UpdatesBinder.getInstance(c);
    // is initialized
    expect(e).not.toBeUndefined();

    // reset
    (UpdatesBinder as any)._instanceStore = new Map<HTMLElement, UpdatesBinder>();
  });

  it('listens to lifecycle\'s load event', () => {
    customElements.define('updates-test-cycle', TestLifeCycleComponent);
    const el = document.createElement('updates-test-cycle') as BaseComponent;
    const spyInit = jest.spyOn(TestLifeCycleComponent.prototype as any, 'lifeCycle');
    const spyListener = jest.spyOn(TestLifeCycleComponent.prototype as any, 'addEventListener');
    UpdatesBinder.initialize(el);
    const e = UpdatesBinder.getInstance(el);
    const spyHandler = jest.spyOn(e as any, 'loadLifecycle')
    const spyHandlerOnLoad = jest.spyOn(e as any, 'lifeCycleHandler')
    document.body.appendChild(el);
    expect(spyInit).toBeCalled();
    expect(spyInit).toBeCalledTimes(4);
    expect(spyListener).toBeCalledWith('lifecycle', expect.any(Function));
    expect(spyListener).toBeCalledTimes(1);
    // get for each cycle
    expect(spyHandler).toBeCalledTimes(4);
    // but only 1 got  through
    expect(spyHandlerOnLoad).toBeCalledTimes(1);
    (UpdatesBinder as any)._instanceStore = new Map<HTMLElement, UpdatesBinder>();
  });

  it('has no store', () => {
    customElements.define('updates-test-nostore', TestNoStoreComponent);
    const el = document.createElement('updates-test-nostore') as BaseComponent;
    UpdatesBinder.initialize(el);
    const e = UpdatesBinder.getInstance(el) as any;
    // is initialized
    expect(e).not.toBeUndefined();
    const error = () => {
      e.lifeCycleHandler(el);
    };
    // with effects map
    expect(error).toBeDefined();
    expect(error).toThrowError(Error);

    // reset
    (UpdatesBinder as any)._instanceStore = new Map<HTMLElement, UpdatesBinder>();

  });

  it('processes the map', () => {
    const c = document.querySelector<HTMLElement>('updates-test') as BaseComponent;
    UpdatesBinder.initialize(c);
    const e = UpdatesBinder.getInstance(c) as any;
    const spySelector = jest.spyOn(e as any, 'registerSelectorUpdates');
    const spyProperty = jest.spyOn(e as any, 'registerPropertyUpdates');
    e['lifeCycleHandler'](c);
    expect(spySelector).toBeCalledTimes(1);
    expect(spyProperty).toBeCalledTimes(0);

  });

});
