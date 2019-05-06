/**
 * The Display decorator.
 *
 * This decorator can be used on fields. It's being used to create label in forms and headers in the grid.
 * Additional parameters are provided to refine forms further.
 *
 * @param name          The Name or Label that appears in forms or as header in grids.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the element's order.
 * @param description   A tooltip that can be used optionally.
 */
export function Display(name: string, order: number = 0, description?: string) {
    // the original decorator
    function displayInternal(target: Object, property: string | symbol): void {
        displayInternalSetup(target, property.toString(), name, order, description);
    }

    // return the decorator
    return displayInternal;
}

export function displayInternalSetup(target: any, key: string, name: string, order: number, description: string) {

    order = parseInt(order.toString());
    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__displayName__${key}`, {
        value: name,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__displayOrder__${key}`, {
        value: order,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__displayDesc__${key}`, {
        value: description,
        enumerable: false,
        configurable: false
    });
}
