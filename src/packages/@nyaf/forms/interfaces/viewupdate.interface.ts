import { Type, BaseComponent } from '@nyaf/lib';
import { IBindingHandler } from '../modelbinder/handlers/ibindinghandler.interface';

/**
 * An update definition connects a store value to a DOM element's property.
 * When the value changes the element's property is updated automatically.
 * This does not re-render the whole component.
 */
export interface ViewUpdate<T extends object, H extends BaseComponent = BaseComponent> {
  /**
   * Any selector that's valid for `querySelector`. Must return a single element.
   */
  selector: string;
  /**
   * The property of the selected element that will receive the store value.
   */
  target: keyof H;
  /**
   * The model's property name that we bind here.
   */
  property: keyof T;
  /**
   * The binder type we use to trigger the binding.
   * Can be omitted and falls back to default binder.
   */
  binder?: Type<IBindingHandler>;
}
