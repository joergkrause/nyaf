import { of } from '@nyaf/lib';

export function val<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | (new (...params: any[]) => T),
  validator: Function & { internal: string },
  binder?: Function
): string {
  const sourceProperty = of(nameFunction).replace(/^@@(.*)@@$/, '$1');
  let binderName = '';
  if (binder) {
    binderName = `:${binder[Symbol.for('bindingname')]}`;
  }
  return `n-val:${sourceProperty}:${validator.internal}${binderName}`;
}
