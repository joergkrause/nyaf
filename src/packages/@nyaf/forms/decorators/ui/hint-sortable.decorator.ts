/**
 * The Sortable decorator.
 *
 * Decorated properties shall produce a sort icon in table views.
 *
 * @param show          Optional, default is true.
 */
export function Sortable(show = true) {
    // the original decorator
    function sortableInternal(target: Object, property: string | symbol): void {
      sortableInternalSetup(target, property.toString(), show);
    }

    // return the decorator
    return sortableInternal;
}

export function sortableInternalSetup(target: any, key: string, show: boolean) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `${Sortable.is}${key}`, {
        value: show,
        enumerable: false,
        configurable: false
    });

}

Sortable.is = '__isSortable__';
