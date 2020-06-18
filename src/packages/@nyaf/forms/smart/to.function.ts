import { of, NameofOptions, Type } from '@nyaf/lib';
import { Display } from '../decorators/ui/hint-display.decorator';

export function to<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | { new(...params: any[]): T },
  prop: keyof H | ((o: H) => any),
  target?: typeof Display,
  options?: NameofOptions): string {
  return of(nameFunction, options);
}
