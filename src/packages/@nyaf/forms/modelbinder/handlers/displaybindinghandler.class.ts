import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';

/**
 * This handler binds the style 'display' to a bool and doesn't listen to anything.
 */
@BindName('DisplayBindingHandler')
export class DisplayBindingHandler implements IBindingHandler {

  constructor() {
  }

  react(binding: Binding): void {
    binding.el.style.display = binding.value ? 'block' : 'none';
  }
}

