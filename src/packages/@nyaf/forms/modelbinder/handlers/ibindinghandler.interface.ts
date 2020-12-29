import { Binding } from '../binding.class';
import { ValidatorBinding } from '../validatorbinding.class';
import { FieldState } from '../modelstate.class';

/**
 * The basic interface for creating custom handlers.
 * {@link bind} is usesd to assign the listener.
 */
export interface IBindingHandler {
  bind?(binding: Binding | ValidatorBinding): void;
  react?(binding: Binding | ValidatorBinding, property?: string): void;
  listener?(binding: Binding | ValidatorBinding, e?: Event): void;
  state?: FieldState;
}
