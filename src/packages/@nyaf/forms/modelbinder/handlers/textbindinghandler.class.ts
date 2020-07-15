import { Binding } from '../binding.class';
import { IBindingHandler } from '../ibindinghandler.interface';

/**
 * This handler binds the property 'textContent' and doesn't listen to anything.
 */
export class TextBindingHandler implements IBindingHandler {
  bind(binding: Binding): void {
    this.react(binding);
  }
  react(binding: Binding): void {
    binding.el.textContent = binding.value;
  }
}
