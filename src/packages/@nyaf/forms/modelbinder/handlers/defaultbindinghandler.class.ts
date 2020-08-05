import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';

/**
 * This handler binds the given property and doesn't listen to anything.
 */
export class DefaultBindingHandler implements IBindingHandler {

  constructor() {
  }

  react(binding: Binding, property: string): void {
    binding.el[property] = binding.value;
  }
}
