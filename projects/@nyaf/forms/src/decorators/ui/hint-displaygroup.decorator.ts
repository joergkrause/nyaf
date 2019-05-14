/**
 * The DisplayGroup decorator. Groups fields in auto forms.
 * Just define a name (that appears as the group's name) and
 * put the very same name on all members of the group.
 *
 * @param name          The Name or Label that appears in forms as the groups legend.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the groups order.
 * @param description   A tooltip that can be used optionally.
 */
export function DisplayGroup(name: string, order: number = 0, description?: string) {
    // the original decorator
    function displayGroupInternal(target: Object, property: string | symbol): void {
        displayGroupInternalSetup(target, property.toString(), name, order, description);
    }

    // return the decorator
    return displayGroupInternal;
}

export function displayGroupInternalSetup(target: any, key: string, name: string, order: number, description: string) {

    order = parseInt(order.toString(), 10);
    // create a helper property to transport a meta data value

    Object.defineProperty(target, `__isGrouped__${key}`, {
        value: true,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__groupName__${key}`, {
        value: name,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__groupOrder__${key}`, {
        value: order,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__groupDesc__${key}`, {
        value: description,
        enumerable: false,
        configurable: false
    });
}

