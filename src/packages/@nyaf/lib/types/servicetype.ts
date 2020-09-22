import { Type } from './type';

/**
 * A helper type to support easy creation of singletons.
 */
export interface ServiceType<T> extends Type<T> {
  instance: T;
}

/**
 * The service class that is not singleton must provide a ctor.
 */
export type Constructor<T> = new (...args: any[]) => T;

