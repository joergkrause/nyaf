import { Binding } from '../binding.class';
import { IBindingHandler } from '../ibindinghandler.interface';

/**
 * This handler binds the style 'visibility' to a bool and doesn't listen to anything.
 */
export class VisibilityBindingHandler implements IBindingHandler {

  constructor() {
  }

  react(binding: Binding): void {
    binding.el.style.visibility = binding.value ? 'visible' : 'hidden';
  }
}

