/**
 * Fundamental ctor interface. For internal purpose only.
 */
export type Type<T> = new (...args: any[]) => T;
