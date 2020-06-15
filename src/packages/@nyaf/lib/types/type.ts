/**
 * Fundamental ctor interface. Used internally to create types in the model classes.
 * Helpful for other purposes, like creating real objects at runtime from generic parameters.
 *
 * The example scenario below allows the definition of a type, derived from an abstract base class, but still can be called with `new`:
 * @example
 * protected static getSingleton<T extends BaseService>(t: Type<T>): T {
 *  if (BaseService._instance == null) {
 *    BaseService._instance = new t();
 *  }
 *  return BaseService._instance as T;
 *  }
 */
export type Type<T> = new (...args: any[]) => T;
