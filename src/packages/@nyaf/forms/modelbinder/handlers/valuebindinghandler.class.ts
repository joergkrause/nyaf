import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';

/**
 * This handler binds the property 'value' and listens to the 'input' event.
 */
export class ValueBindingHandler implements IBindingHandler {

  constructor() {
  }

  bind(binding: Binding): void {
    binding.el.addEventListener('input', (e) => {
      this.listener(binding);
    });
  }
  react(binding: Binding, property?: string): void {
    if ((binding.el as HTMLInputElement).value !== binding.value) {
      (binding.el as HTMLInputElement).value = binding.value;
    }
  }
  listener(binding: Binding): void {
    const value = (binding.el as HTMLInputElement).value;
    if (binding.value !== value) {
      binding.value = value;
    }
  }
}
