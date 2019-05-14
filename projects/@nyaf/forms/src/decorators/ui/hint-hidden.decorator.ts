/**
 * The Hidden decorator.
 *
 * The @see `DataGrid` does not show columns for properties tagged with `@Hidden()`.
 * Fields in forms that render automatically
 * using the @see `AcEditor` component will render as <input type="hidden">.
 *
 * @param hide          Optional, default is true.
 */
export function Hidden(hide = true) {
    // the original decorator
    function hiddenInternal(target: Object, property: string | symbol): void {
        hiddenInternalSetup(target, property.toString(), hide);
    }

    // return the decorator
    return hiddenInternal;
}

export function hiddenInternalSetup(target: any, key: string, hide: boolean) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__isHidden__${key}`, {
        value: hide,
        enumerable: false,
        configurable: false
    });

}
