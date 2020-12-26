import { of, Type, NameofOptions } from '@nyaf/lib';
import { to } from './to.function';
import { IBindingHandler } from '../modelbinder/handlers/ibindinghandler.interface';
import { ValueBindingHandler } from '../modelbinder/handlers/valuebindinghandler.class';

/**
 * A binder for any attribute, does not require a filled `n-bind`. Instead, add an empty 'n-bind' to trigger the other attributes quickly.
 * <a href={bind<Model>(m => m.url)} n-bind >...
 * @param nameFunction A lambda selector for the viewmodel property
 * @param target A decorator that provides the property
 * @typeParam T A view model type
 */
export function bind<T extends Object, H extends HTMLElement = HTMLElement>(
  nameFunction: ((obj: T) => any) | (new (...params: any[]) => T),
  bindingHandlerOrKey?: string | Type<IBindingHandler>,
  decoratorKey?: string,
  options?: NameofOptions
): string {
  // attribute not set because we use bind<>() on a specific attribute already
  const toBinding = to<T>(nameFunction, null, bindingHandlerOrKey, decoratorKey, options);
  return `n-bind:${toBinding}`;
}
