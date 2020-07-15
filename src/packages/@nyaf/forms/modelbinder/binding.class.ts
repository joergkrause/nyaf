import { ModelBinder } from './modelbinder.class';

/**
 * The binder is used to actually bind an elements property to a scope.
 * It's required if you implement your own binders.
 */
export class Binding {
  /**
   * The binder assignment that connects viewmodel properties to element attributes.
   * @param modelProperty The property of the viewmodel this binder binds to
   * @param handler The handler that handles the binding. For attribute binders this is 'default' @see DefaultBindingHandler
   * @param binderInstance The binder instance that provides access to the actual binder objects
   * @param el The element that the binder will assign the viewmodel to
   */
  constructor(
    private modelProperty: string,
    private handler: string,
    private binderInstance: ModelBinder<any>,
    public el: HTMLElement
  ) {
  }
  /**
   * Define the binder
   * @param property An options property, sued to assign to a specific proeprty in multi-attribute binding
   */
  public bind(property?: string) {
    const bindingHandler = this.binderInstance.handlers[this.handler];
    if (bindingHandler) {
      bindingHandler.bind(this);
      this.binderInstance.subscribe(this.modelProperty, () => {
        bindingHandler.react(this, property);
      });
    } else {
      throw new Error(`The binding for ${this.handler} was not defined. Implement and assign handler before you initialize the form.`);
    }
  }
  public set value(value) {
    this.binderInstance.scope[this.modelProperty] = value;
  }
  public get value() {
    return this.binderInstance.scope[this.modelProperty];
  }
}
