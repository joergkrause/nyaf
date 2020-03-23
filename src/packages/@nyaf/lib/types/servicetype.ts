import { Type } from './type';

/**
 * A helper type to support easy creation of singletons.
 */
export interface ServiceType<T> extends Type<T> {
  instance: T;
}
