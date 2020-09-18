import * as symbols from '../decorator.props';

describe('Correct Symbol setup', () => {
  it('CTOR', () => {
    expect(symbols.CTOR).toEqual(Symbol.for('__ctor__'));
  });
  it('ShadowDOM_Symbol_WithShadow', () => {
    expect(symbols.ShadowDOM_Symbol_WithShadow).toEqual(Symbol.for('withShadow'));
  });
  it('UseParentStyles_Symbol', () => {
    expect(symbols.UseParentStyles_Symbol).toEqual(Symbol.for('useParentStyles'));
  });
  it('CustomElement_Symbol_Selector', () => {
    expect(symbols.CustomElement_Symbol_Selector.toString()).toEqual('Symbol(CustomElementSelector)');
  });
  it('Directive_Symbol_Selector', () => {
    expect(symbols.Directive_Symbol_Selector.toString()).toEqual('Symbol(DirectiveSelector)');
  });
  it('Events_Symbol_Eventlist', () => {
    expect(symbols.Events_Symbol_Eventlist.toString()).toEqual('Symbol(EventEventList)');
  });
  it('Expands_Symbol', () => {
    expect(symbols.Expands_Symbol.toString()).toEqual('Symbol(Expands)');
  });
  it('Extends_Symbol', () => {
    expect(symbols.Extends_Symbol.toString()).toEqual('Symbol(Extends)');
  });
  it('InjectServices_Symbol', () => {
    expect(symbols.InjectServices_Symbol.toString()).toEqual('Symbol(InjectServices)');
  });
});
