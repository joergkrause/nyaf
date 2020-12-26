// Symbol.for because we want to use it outside with no export
export const CTOR = Symbol.for('__ctor__');
export const ShadowDOM_Symbol_WithShadow = Symbol.for('withShadow');
export const UseParentStyles_Symbol = Symbol.for('useParentStyles');
export const TheParentStyles_Symbol = Symbol.for('theParentStyles');
export const UniqueId_Symbol = Symbol.for('ComponentUniqueId'); // TODO:: use
// Lib internals
export const CustomElement_Symbol_Selector = Symbol('CustomElementSelector');
export const Directive_Symbol_Selector = Symbol('DirectiveSelector');
export const Events_Symbol_Eventlist = Symbol('EventEventList');
export const Expands_Symbol = Symbol('Expands');
export const Extends_Symbol = Symbol('Extends');
export const InjectServices_Symbol = Symbol('InjectServices');

