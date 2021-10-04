import { EffectsBinder } from '../effectsbinder.class';
import { BaseComponent } from '@nyaf/lib';
import { Effects } from '../../decorators/effects.decorator';
import { Effects_Symbol } from '../../consts/decorator.props';

describe('Effects Binder', () => {

  @Effects([
    {
      trigger: 'click',
      action: 'TEST',
      selector: '#test'
    }
  ])
  class TestComponent extends BaseComponent<any> {
    constructor() {
      super();
    }
    render(): any {
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


  beforeAll(() => {
    customElements.define('effects-test', TestComponent);
    const el = document.createElement('effects-test');
    document.body.appendChild(el);
  });

  it('no instance without init', () => {
    const el = document.createElement('div');
    const e = EffectsBinder.getInstance(el);
    // not initialized
    expect(e).toBeUndefined();
  });

  it('instance with init', () => {
    const c = document.querySelector<HTMLElement>('effects-test') as BaseComponent;
    EffectsBinder.initialize(c);
    const e = EffectsBinder.getInstance(c);
    // is initialized
    expect(e).not.toBeUndefined();
    // reset
    (EffectsBinder as any)._instanceStore = new Map<HTMLElement, EffectsBinder>();
  });

  it('initiatews on lifecycle event', () => {
    const c = document.querySelector<HTMLElement>('effects-test') as BaseComponent;
    EffectsBinder.initialize(c);
    const e = EffectsBinder.getInstance(c);
    // is initialized
    expect(e).not.toBeUndefined();

    // reset
    (EffectsBinder as any)._instanceStore = new Map<HTMLElement, EffectsBinder>();
  });

  it('listens to lifecycle\'s load event', () => {
    customElements.define('effects-test-cycle', TestLifeCycleComponent);
    const el = document.createElement('effects-test-cycle') as BaseComponent;
    const spyInit = jest.spyOn(TestLifeCycleComponent.prototype as any, 'lifeCycle');
    const spyListener = jest.spyOn(TestLifeCycleComponent.prototype as any, 'addEventListener');
    EffectsBinder.initialize(el);
    const e = EffectsBinder.getInstance(el);
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
    (EffectsBinder as any)._instanceStore = new Map<HTMLElement, EffectsBinder>();
  });

  it('has no store', () => {
    const c = document.querySelector<HTMLElement>('effects-test') as BaseComponent;
    EffectsBinder.initialize(c);
    const e = EffectsBinder.getInstance(c) as any;
    // is initialized
    expect(e).not.toBeUndefined();
    const error = () => {
      e.lifeCycleHandler(c, false);
    };
    // with effects map
    expect(error).toBeDefined();
    expect(error).toThrowError(Error);

    // reset
    (EffectsBinder as any)._instanceStore = new Map<HTMLElement, EffectsBinder>();

  });

  // it('has no effects map', () => {
  //   const c = document.querySelector<HTMLElement>('effects-test-cycle') as BaseComponent;
  //   EffectsBinder.initialize(c);
  //   const e = EffectsBinder.getInstance(c) as any;
  //   // is initialized
  //   expect(e).not.toBeUndefined();
  //   const error = () => {
  //     e.lifeCycleHandler(c, false);
  //   };
  //   // no effects map
  //   expect(error).toBeUndefined();

  //   // reset
  //   (EffectsBinder as any)._instanceStore = new Map<HTMLElement, EffectsBinder>();

  // });

});