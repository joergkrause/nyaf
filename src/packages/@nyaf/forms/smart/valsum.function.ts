import { of } from '@nyaf/lib';

export function valsum<T extends Object, H extends HTMLElement = HTMLElement>(
  binder: Function
): string {
  let binderName = '';
  if (binder) {
    binderName = `:${binder[Symbol.for('bindingname')]}`;
  }
  return `n-sum:${binderName}`;
}
