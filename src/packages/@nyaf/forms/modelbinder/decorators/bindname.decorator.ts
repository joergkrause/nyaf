import { IBindingHandler } from '../handlers/ibindinghandler.interface';

/**
 * The BindName decorator is required in Binders to preserve the bindername.
 * This makes using types in forms working even after minification.
 * Alternatively one can consider using string names.
 *
 * @example
 * ```
 * @BindName('BinderName')
 *
 * // later in code
 * val<Model>(c => c.prop, Validator, Binder)
 * ```
 *
 * @example
 * // no decorator
 * // later in code
 * val<Model>(c => c.prop, Validator, 'Binder')
 */
export function BindName(binderClass: string) {
  return function (target: Object) {
    Object.defineProperty(target, Symbol.for('bindingname'), {
      value: binderClass,
      enumerable: false,
      configurable: false,
      writable: false
    });
  };
}
