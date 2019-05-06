/**
 * The Sortable decorator.
 *
 */
export function Sortable() {
    // the original decorator
    function sortableInternal(target: Object, property: string | symbol): void {
			sortableInternalSetup(target, property.toString());
    }

    // return the decorator
    return sortableInternal;
}

export function sortableInternalSetup(target: any, key: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__isSortable__${key}`, {
        value: true,
        enumerable: false,
        configurable: false
    });

}
