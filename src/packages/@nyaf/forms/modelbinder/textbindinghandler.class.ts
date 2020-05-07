import { Binding } from './binding.class';
import { IBindingHandler } from './ibindinghandler.interface';

export class TextBindingHandler implements IBindingHandler {
  bind(binding: Binding) {
    this.react(binding);
  }
  react(binding: Binding) {
    binding.el.textContent = binding.value;
  }
}
