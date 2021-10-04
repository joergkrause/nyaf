import { ModelBinder } from './modelbinder.class';

/**
 * The binder is used to actually bind an elements property to a scope.
 * It's a connection between a model's properties and some UI that represent these values.
 * It's required if you implement your own binders.
 */
export class Binding {
  /**
   * The binder assignment that connects viewmodel properties to element attributes.
   * @param modelProperty The property of the viewmodel this binder binds to
   * @param handler The handler that handles the binding. For attribute binders this is 'default' {@link DefaultBindingHandler}
   * @param binderInstance The binder instance that provides access to the actual binder objects
   * @param el The element that the binder will assign the viewmodel to
   */
  constructor(
    protected modelProperty: string,
    protected handlerKey: string,
    protected binderInstance: ModelBinder<any>,
    public el: HTMLElement
  ) {
  }
  /**
   * Define the binder
   * @param property An optional property, used to assign to a specific property in multi-attribute binding
   */
  public bind(property?: string) {
    const bindingHandler = this.binderInstance.handlers[this.handlerKey];
    if (bindingHandler) {
      bindingHandler.bind && bindingHandler.bind(this); // bind is optional
      this.binderInstance.subscribe(this.modelProperty, () => {
        // listen to changes of the model's property
        bindingHandler.react(this, property);
      });
      // initial value
      bindingHandler.react(this, property);
    } else {
      throw new Error(`The binding for ${this.handlerKey} was not defined. Implement and assign handler before you initialize the form.`);
    }
  }
  /**
   * Allow any binders to set the global modelbinder value
   */
  public set value(value) {
    if (this.binderInstance.scope[this.modelProperty] !== value) {
      this.binderInstance.scope[this.modelProperty] = value;
    }
  }
  /**
   * Retrieve the global binder's value for the given property.
   */
  public get value() {
    return this.binderInstance.scope[this.modelProperty];
  }
  /**
   * Access the form's fields state information and set (touched/pristine/dirty)
   */
  public get state() {
    return this.binderInstance.state.state;
  }
  /**
   * The property this binder encapsulates
   */
  public get prop() {
    return this.modelProperty;
  }
}
