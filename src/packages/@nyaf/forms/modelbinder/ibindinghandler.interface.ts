import { Binding } from './binding.class';
import { ValidatorBinding } from './validatorbinding.class';

/**
 * The basic interface for creating custom handlers.
 */
export interface IBindingHandler {
  bind(binding: Binding | ValidatorBinding): void;
  react(binding: Binding | ValidatorBinding, property?: string): void;
  listener?(binding: Binding | ValidatorBinding): void;
}
