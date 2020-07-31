import { Binding } from '../binding.class';
import { IBindingHandler } from '../ibindinghandler.interface';

/**
 * This handler binds the style 'display' to a bool and doesn't listen to anything.
 */
export class DisplayBindingHandler implements IBindingHandler {
  bind(binding: Binding): void {
    this.react(binding);
  }
  react(binding: Binding): void {
    binding.el.style.display = binding.value ? 'block' : 'none';
  }
}

