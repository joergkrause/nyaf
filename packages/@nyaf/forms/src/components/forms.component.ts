import { BaseComponent, ComponentData } from '@nyaf/lib';
import { ModelState } from '../models/modelstate.model';

/**
 * Use this as base class for model driven forms.
 */
export abstract class FormsComponent extends BaseComponent<{}> {
  protected modelState: ModelState<{}>;
  protected model: {};

  constructor() {
    super();
  }

  abstract render(): string;

  protected abstract getData(): ComponentData;
}
