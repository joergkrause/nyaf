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

  it('no instance without init', () => {
    const el = document.createElement('div');
    const e = EffectsBinder.getInstance(el);
    // no initialized
    expect(e).toBeUndefined();
  });

  it('instance with init', () => {
    customElements.define('effects-test', TestComponent);
    const el = document.createElement('effects-test');
    document.body.innerHTML = '<effects-test></effects-test>';
    const c = document.querySelector<HTMLElement>('effects-test') as BaseComponent;
    EffectsBinder.initialize(c);
    const e = EffectsBinder.getInstance(c);
    // no initialized
    expect(e).not.toBeUndefined();
  });

});