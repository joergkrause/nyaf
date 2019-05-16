/**
 * The ViewModel decorator.
 *
 * This decorator defines the model for a component. It's a class decorator.
 *
 */
export function ViewModel<T extends {}>(defaults: T) {
    // the original decorator
    // tslint:disable-next-line:no-shadowed-variable
    function viewModelInternal(target: Object, defaults: T): void {
      viewModelInternalSetup<T>(target, defaults);
    }

    // return the decorator
    return viewModelInternal;
}

export function viewModelInternalSetup<T extends {}>(target: any, defaults: T) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `model`, {
        value: defaults,
        enumerable: false,
        configurable: false
    });

}
