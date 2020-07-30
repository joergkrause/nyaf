import { ValidatorBinding } from '../validatorbinding.class';
import { IBindingHandler } from '../ibindinghandler.interface';

/**
 * This handler binds the style 'visibility' to a bool and doesn't listen to anything.
 */
export class VisibilityForValidationBindingHandler implements IBindingHandler {
  bind(binding: ValidatorBinding): void {
    this.react(binding);
  }
  react(binding: ValidatorBinding): void {
    if (binding.validationProperty && binding.validationState && binding.validationState.validators) {
      const valid = binding.validationState.validators[binding.validationProperty]?.isValid;
      console.log('received val binder', valid);
      binding.el.style.visibility = valid ? 'visible' : 'hidden';
    }
  }
}
