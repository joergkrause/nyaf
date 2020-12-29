import { ModelBinder } from './modelbinder.class';
import { ModelState } from './modelstate.class';
import { Binding } from './binding.class';

/**
 * The binder is used to actually bind a validator to elements that are scoped to validation.
 * It's used internally only.
 * @ignore
 */
export class ValidatorBinding extends Binding {

  /**
   * The binder assignment that connects viewmodel properties to element attributes.
   * @param modelProperty The property of the viewmodel this binder binds to
   * @param handler The handler that handles the binding. For attribute binders this is 'default' {@link DefaultBindingHandler}
   * @param binderInstance The binder instance that provides access to the actual binder objects
   * @param el The element that the binder will assign the viewmodel to
   */
  constructor(
    modelProperty: string,
    private validationHandler: any,
    binderInstance: ModelBinder<any>,
    private validatorKey: string,
    el: HTMLElement
  ) {
    super(modelProperty, validationHandler, binderInstance, el);
    if (!validationHandler) {
      throw new Error('Missing validation handler');
    }
  }
  /**
   * Define the binder
   * @param property An options property, used to assign to a specific proeprty in multi-attribute binding
   */
  public bind(property?: string) {
    //const bindingHandler = this.binderInstance.handlers[this.handlerKey];
    this.validationHandler.bind && this.validationHandler.bind(this); // bind is optional
    this.binderInstance.subscribe(super.modelProperty, () => {
      this.validationHandler.react(this);
    });
  }
  public set value(value) {
    this.binderInstance.state.validators[this.modelProperty].isValid[this.validatorKey] = value;
    this.validationHandler.react(this);

  }
  public get value() {
    return this.binderInstance.state.validators[this.modelProperty].isValid[this.validatorKey];
  }
  public get validationProperty(): string {
    return super.modelProperty;
  }
  public get validationState(): ModelState<any> {
    return super.binderInstance.state;
  }
}
