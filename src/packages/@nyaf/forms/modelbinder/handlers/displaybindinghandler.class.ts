import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';
import { FieldState } from '../modelstate.class';

/**
 * This handler binds the style 'display' to a bool and doesn't listen to anything.
 * It also checks the touched state.
 */
@BindName('DisplayBindingHandler')
export class DisplayBindingHandler implements IBindingHandler {

  private binding: Binding;

  constructor() {
  }

  bind(binding: Binding): void {
    this.binding = binding;
    binding.el.style.display = 'none';
  }

  react(binding: Binding): void {
    binding.el.style.display = binding.value ? 'none' : 'block';
  }

  get state(): FieldState {
    return this.binding.state[this.binding.prop];
  }

}

