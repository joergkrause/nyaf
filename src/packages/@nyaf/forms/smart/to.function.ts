import { of, NameofOptions, Type } from '@nyaf/lib';
import { IBindingHandler } from '../modelbinder/handlers/ibindinghandler.interface';
import { ValueBindingHandler } from '../modelbinder/handlers/valuebindinghandler.class';

/**
 * Type safe binder to bind a viewmodel property to an element property. Apply to the `n-bind` attribute.
 * Needs a generic for the viewmodel and optional a generic for the type of element the target comes from.
 * @param nameFunction A lambda selector for the viewmodel property
 * @param uiAttribute The property to bind to. Change the second generic to allow more properties.
 * @param decoratorKey A decorator key that provides the property, use something like 'innerText' for example.
 * @param options Additional options
 * @typeParam T A view model type
 */
export function to<T extends Object, H extends HTMLElement = HTMLInputElement>(
  nameFunction: ((obj: T) => any) | (new(...params: any[]) => T),
  uiAttribute: keyof H | ((o: H) => any) | Function,
  bindingHandlerOrKey?: string | Type<IBindingHandler>,
  decoratorKey?: string,
  options?: NameofOptions): string {
  const modelProperty = of(nameFunction, options).replace(/^@@(.*)@@$/, '$1');
  let targetuiAttribute = '';
  if (uiAttribute) {
    if (typeof uiAttribute === 'function') {
      targetuiAttribute = uiAttribute.toString().split('.')[1] as any;
    } else {
      if (typeof uiAttribute !== 'string') {
        targetuiAttribute = (<any>uiAttribute).name;
      } else {
        targetuiAttribute = uiAttribute as string;
      }
    }
  }
  let bindingHandlerKey = '';
  if (typeof bindingHandlerOrKey === 'function') {
    bindingHandlerKey = bindingHandlerOrKey.name;
  }
  if (!bindingHandlerKey && uiAttribute === 'value') {
    bindingHandlerKey = ValueBindingHandler.name;
  }
  // modelProperty: The property of view model we pull the value from, such as "userName"
  // bindingHandler: The binder, that provides the bindig logic
  // targetuiAttribute: The attribute the value is bound to, such as "innerText"
  // decoratorKey: (optional) the binding instruction, if exists, the value is pulled from the decorator instead from model (for label binding for example)
  return `${modelProperty}:${bindingHandlerKey}:${targetuiAttribute}:${decoratorKey || ''}`;
}


