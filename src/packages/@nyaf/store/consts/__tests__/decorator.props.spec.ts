import * as symbols from '../decorator.props';

describe('Correct Symbol setup', () => {
  it('CTOR', () => {
    expect(symbols.CTOR).toEqual(Symbol.for('__ctor__'));
  });
  it('Effects_Symbol', () => {
    expect(symbols.Effects_Symbol).toEqual(Symbol.for('effects'));
  });
  it('Effects_Symbol_Ctor', () => {
    expect(symbols.Effects_Symbol_Ctor).toEqual(Symbol.for('effects__ctor'));
  });
  it('Updates_Symbol', () => {
    expect(symbols.Updates_Symbol).toEqual(Symbol.for('updates'));
  });
  it('Updates_Symbol_Ctor', () => {
    expect(symbols.Updates_Symbol_Ctor).toEqual(Symbol.for('updates__ctor'));
  });
});
