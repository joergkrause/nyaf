/**
 * The Width decorator. Width of colum in px.
 *
 * @param width          Optional, default is 100.
 */
export function Width(width = 100) {
    // the original decorator
    function widthInternal(target: Object, property: string | symbol): void {
			widthInternalSetup(target, property.toString(), width);
    }

    // return the decorator
    return widthInternal;
}

export function widthInternalSetup(target: any, key: string, width: number) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasWidth__${key}`, {
        value: width,
        enumerable: false,
        configurable: false
    });

}
