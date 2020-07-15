import { Binding } from './binding.class';

/**
 * The basic interface for creating custom handlers.
 */
export interface IBindingHandler {
  bind(binding: Binding): void;
  react(binding: Binding, property?: string): void;
  listener?(binding: Binding): void;
}
