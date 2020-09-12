import { Binding } from '../binding.class';
import { IBindingHandler } from './ibindinghandler.interface';
import { BindName } from '../decorators/bindname.decorator';

/**
 * This handler binds the given property and doesn't listen to anything.
 */
@BindName('DefaultBindingHandler')
export class DefaultBindingHandler implements IBindingHandler {

  constructor() {
  }

  react(binding: Binding, property: string): void {
    binding.el[property] = binding.value;
  }
}

