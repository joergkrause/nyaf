import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';

/**
 * This handler binds the property 'value' and listens to the 'input' event.
 */
export class ValueBindingHandler implements IBindingHandler {
  bind(binding: Binding): void {
    binding.el.addEventListener('input', () => {
      this.listener(binding);
    });
    // this.react(binding);
  }
  react(binding: Binding): void {
    (binding.el as HTMLInputElement).value = binding.value;
  }
  listener(binding: Binding): void {
    const value = (binding.el as HTMLInputElement).value;
    binding.value = value;
  }
}
