import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';

/**
 * This handler binds the style 'visibility' to a bool and doesn't listen to anything.
 */
@BindName('VisibilityBindingHandler')
export class VisibilityBindingHandler implements IBindingHandler {

  constructor() {
  }

  react(binding: Binding): void {
    binding.el.style.visibility = binding.value ? 'hidden' : 'visible';
  }
}

