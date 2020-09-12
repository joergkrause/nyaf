import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';

/**
 * This handler binds the property 'textContent' and doesn't listen to anything.
 */
@BindName('TextBindingHandler')
export class TextBindingHandler implements IBindingHandler {

  constructor() {
  }

  bind(binding: Binding): void {
    this.react(binding);
  }
  react(binding: Binding): void {
    binding.el.textContent = binding.value;
  }
}
