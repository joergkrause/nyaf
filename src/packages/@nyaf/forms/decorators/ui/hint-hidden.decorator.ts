/**
 * The Hidden decorator.
 *
 * Fields in forms that render automatically using the an auto component will render as <input type="hidden">.
 * In table views this decorator shall prevent the column at all.
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
    Object.defineProperty(target, `${Hidden.is}${key}`, {
        value: hide,
        enumerable: false,
        configurable: false
    });

}

Hidden.is = '__isHidden__';
