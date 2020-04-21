/**
 * The Filterable decorator.
 *
 * A decorated property shall produce a filter in table views.
 *
 * @param show          Optional, default is true.
 */
export function Filterable(show = true) {
    // the original decorator
    function filterableInternal(target: Object, property: string | symbol): void {
        filterableInternalSetup(target, property.toString(), show);
    }

    // return the decorator
    return filterableInternal;
}

export function filterableInternalSetup(target: any, key: string, show: boolean) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__isFilterable__${key}`, {
        value: show,
        enumerable: false,
        configurable: false
    });

}
