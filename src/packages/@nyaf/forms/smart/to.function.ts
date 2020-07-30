import { of, NameofOptions, Type } from '@nyaf/lib';
import { Display } from '../decorators/ui/hint-display.decorator';

/**
 * Type safe binder to bind a viewmodel property to an element property. Apply to the `n-bind` attribute.
 * Needs a generic for the viewmodel and optional a generic for the type of element the target comes from.
 * @param nameFunction A lambda selector for the viewmodel property
 * @param prop The property to bind to. Change the second generic to allow more properties.
 * @param target A decorator key that provides the property, use somthing like display.desc for example.
 * @param options Additional options
 * @typeParam T A view model type
 */
export function to<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | (new(...params: any[]) => T),
  prop: keyof H | ((o: H) => any),
  target?: string,
  options?: NameofOptions): string {
  const sourceProperty = of(nameFunction, options).replace(/^@@(.*)@@$/, '$1');
  let targetProp = prop;
  if (typeof prop === 'function') {
    // handle c => c.value expressions
    targetProp = prop.toString().split('.')[1] as any;
  }
  const realTarget = (target !== undefined) ? `:${target}` : '';
  return `${targetProp}:${sourceProperty}${realTarget}`;
}


