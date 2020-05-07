import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';

export class CheckedBindingHandler implements IBindingHandler {
  bind(binding: Binding) {
    binding.el.addEventListener('input', () => {
      this.listener(binding);
    });
    // this.react(binding);
  }
  react(binding: Binding) {
    (binding.el as HTMLInputElement).checked = binding.value;
  }
  listener(binding: Binding) {
    const value = (binding.el as HTMLInputElement).checked;
    binding.value = value;
  }
}
