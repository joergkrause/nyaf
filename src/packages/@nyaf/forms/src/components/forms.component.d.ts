import { BaseComponent } from '@nyaf/lib';
import { ModelState } from '../models/modelstate.model';
/**
 * Use this as base class for model driven forms.
 */
export declare abstract class FormsComponent<T> extends BaseComponent<T> {
    protected modelState: ModelState<T>;
    protected model: T;
    constructor();
    abstract render(): string;
}
