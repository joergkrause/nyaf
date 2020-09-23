import { EffectsBinder } from '../effectsbinder.class';

describe('Effects Binder', () => {

  it('instance', () => {
    const e = new EffectsBinder();
    expect(e).toBeInstanceOf(EffectsBinder);
  });
});