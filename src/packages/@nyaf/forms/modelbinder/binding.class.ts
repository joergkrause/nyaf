import { ModelBinder } from './modelbinder.class';
import { ModelState } from './modelstate.class';

/**
 * The binder is used to actually bind an elements property to a scope.
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
    protected handler: string,
    protected binderInstance: ModelBinder<any>,
    public el: HTMLElement
  ) {
    console.log('ctor Binding', handler, el);
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
    console.log('assign value to scope', this.modelProperty, value);
    this.binderInstance.scope[this.modelProperty] = value;
  }
  public get value() {
    console.log('read value from scope', this.modelProperty, this.binderInstance.scope[this.modelProperty]);
    return this.binderInstance.scope[this.modelProperty];
  }
}
