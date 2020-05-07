import { ModelBinder } from './modelbinder.class';

export class Binding {
  constructor(private prop: string, private handler: string, public el: HTMLElement) {
  }
  public bind() {
    const bindingHandler = ModelBinder.handlers[this.handler];
    bindingHandler.bind(this);
    ModelBinder.subscribe(this.prop, () => {
      bindingHandler.react(this);
    });
  }
  public set value(value) {
    ModelBinder.scope[this.prop] = value;
  }
  public get value() {
    return ModelBinder.scope[this.prop];
  }
}
