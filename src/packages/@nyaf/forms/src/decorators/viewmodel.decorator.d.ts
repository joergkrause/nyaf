/**
 * The ViewModel decorator.
 *
 * This decorator defines the model for a component. It's a class decorator.
 *
 */
export declare function ViewModel<T extends {}>(): (target: Object) => void;
export declare function viewModelInternalSetup<T extends {}>(target: any, defaults: T): void;
