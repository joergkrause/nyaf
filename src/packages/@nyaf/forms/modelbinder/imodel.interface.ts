import { ModelBinder } from './modelbinder.class';

/**
 * The interface used to enforce the model field in a component. It supports typed access to the view model.
 *
 * @typeParam VM A view model type. That's a regular class (not an interface), optionally with decorators on properties.
 */
export interface IModel<VM extends object> {
  /**
   * The actual model instance. This requires the @see ViewModel decorator on the component, which provides an actual instance.
   *
   * @typeParam VM A view model type. That's a regular class (not an interface), optionally with decorators on properties.
   */
  model: ModelBinder<VM>;
}
