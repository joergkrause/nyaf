import { Binding } from './binding.class';

export interface IBindingHandler {
  bind(binding: Binding);
  react(binding: Binding);
  listener?(binding: Binding);
}
