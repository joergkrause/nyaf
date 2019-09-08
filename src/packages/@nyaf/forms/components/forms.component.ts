import { BaseComponent, ComponentData } from '@nyaf/lib';
import { ModelState } from '../models/modelstate.model';

/**
 * Use this as base class for model driven forms.
 */
export abstract class FormsComponent<T> extends BaseComponent<T> {
  protected modelState: ModelState<T>;
  protected model: T;

  constructor() {
    super();
  }

  abstract render(): string;

}
