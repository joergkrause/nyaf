import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';

/**
 * This handler binds the style 'display' to a bool and doesn't listen to anything.
 * It also listens to the focus event to detect the touched state.
 */
@BindName('DisplayBindingHandler')
export class DisplayBindingHandler implements IBindingHandler {

  touched: boolean;

  constructor() {
  }

  bind(binding: Binding): void {
    binding.el.addEventListener('focus', (e) => {
      this.touched = true;
    });
  }

  react(binding: Binding): void {
    binding.el.style.display = binding.value && this.touched ? 'block' : 'none';
  }
}

