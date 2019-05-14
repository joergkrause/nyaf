import { BaseComponent } from 'nyaf';
import { ModelState } from '../models/modelstate.model';

/**
 * Use this as base class for model driven forms.
 */
export class FormsComponent extends BaseComponent {
  
  protected modelState: ModelState<{}>;
  protected model: {};

  constructor() {
    super();
  }


}
