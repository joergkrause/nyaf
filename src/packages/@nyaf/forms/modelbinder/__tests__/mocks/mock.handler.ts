import { Binding } from "../../binding.class";
import { IBindingHandler } from "../../handlers/ibindinghandler.interface";

export class MockHandler implements IBindingHandler {
  bind?(binding: Binding): void {
  }
  react(binding: Binding, property?: string): void {
  }
  listener?(binding: Binding, e?: Event): void {
  }
}
