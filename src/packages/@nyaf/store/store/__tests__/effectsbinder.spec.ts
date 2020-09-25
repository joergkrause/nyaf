import { EffectsBinder } from '../effectsbinder.class';
import { BaseComponent } from '@nyaf/lib';

describe('Effects Binder', () => {

  class TestComponent extends BaseComponent<any> {
    constructor() {
      super();
    }
    async render() {
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

});