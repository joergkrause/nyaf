import { ModelBinder } from './modelbinder.class';

/**
 * The binder is used to actually bind an elements property to a scope.
 * It's required if you implement your own binders.
 */
export class Binding {
  constructor(private prop: string, private handler: string, public el: HTMLElement) {
  }
  public bind() {
    const bindingHandler = ModelBinder.handlers[this.handler];
    if (bindingHandler) {
      bindingHandler.bind(this);
      ModelBinder.subscribe(this.prop, () => {
        bindingHandler.react(this);
      });
    } else {
      throw new Error(`The binding for ${this.handler} was not defined. Implement and assign handler before you initialize the form.`);
    }
  }
  public set value(value) {
    ModelBinder.scope[this.prop] = value;
  }
  public get value() {
    return ModelBinder.scope[this.prop];
  }
}
