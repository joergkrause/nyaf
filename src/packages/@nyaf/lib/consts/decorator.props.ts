// Symbol.for because we want to use it outside with no export
export const CTOR: any = Symbol.for('__ctor__');
export const ShadowDOM_Symbol_WithShadow: unique symbol = Symbol.for('withShadow');
export const UseParentStyles_Symbol: any = Symbol.for('useParentStyles');
export const TheParentStyles_Symbol: any = Symbol.for('theParentStyles');
export const UniqueId_Symbol: any = Symbol.for('ComponentUniqueId'); // TODO:: use
// Lib internals
export const CustomElement_Symbol_Selector: unique symbol = Symbol('CustomElementSelector');
export const Directive_Symbol_Selector: any = Symbol('DirectiveSelector');
export const Events_Symbol_Eventlist: unique symbol = Symbol('EventEventList');
export const Expands_Symbol: any = Symbol('Expands');
export const Extends_Symbol: any = Symbol('Extends');
export const InjectServices_Symbol: any = Symbol('InjectServices');

