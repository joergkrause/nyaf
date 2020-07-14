import { of, NameofOptions, Type } from '@nyaf/lib';

/**
 * A binder for any attribute, does not require `n-bind`.
 * @param nameFunction A lambda selector for the viewmodel property
 * @param prop The property to bind to. Change the second generic to allow more properties.
 * @param target A decorator that provides the property
 */
export function bind<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | { new(...params: any[]): T },
  prop: keyof H | ((o: H) => any),
  target?: string): string {
  const sourceProperty = of(nameFunction, {}).replace(/^@@(.*)@@$/, '$1');
  let targetProp = prop;
  if (typeof prop === 'function') {
    // handle c => c.value expressions
    targetProp = prop.toString().split('.')[1] as any;
  }
  const realTarget = (target !== undefined) ? `:${target}` : '';
  return `n-bind:${targetProp}:${sourceProperty}${realTarget}`;
}