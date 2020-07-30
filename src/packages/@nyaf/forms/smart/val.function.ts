import { of } from '@nyaf/lib';

export function val<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | (new(...params: any[]) => T),
//  prop: keyof H | ((o: H) => any),
  validator: Function): string {
  const sourceProperty = of(nameFunction).replace(/^@@(.*)@@$/, '$1');
  // let targetProp = prop;
  // if (typeof prop === 'function') {
  //   // handle c => c.value expressions
  //   targetProp = prop.toString().split('.')[1] as any;
  // }
  return `n-val:${sourceProperty}:${validator.name}`;
}
