import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';

/**
 * This handler binds the property 'checked' and listens to the 'input' event.
 */
@BindName('CheckedBindingHandler')
export class CheckedBindingHandler implements IBindingHandler {

  constructor() {
  }

  bind(binding: Binding): void {
    binding.el.addEventListener('input', () => {
      this.listener(binding);
    });
  }
  react(binding: Binding): void {
    (binding.el as HTMLInputElement).checked = binding.value;
  }
  listener(binding: Binding): void {
    const value = (binding.el as HTMLInputElement).checked;
    binding.value = value;
  }
}

