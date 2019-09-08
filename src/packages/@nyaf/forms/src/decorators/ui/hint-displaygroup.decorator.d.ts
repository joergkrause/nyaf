/**
 * The DisplayGroup decorator. Groups fields in auto forms.
 * Just define a name (that appears as the group's name) and
 * put the very same name on all members of the group.
 *
 * @param name          The Name or Label that appears in forms as the groups legend.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the groups order.
 * @param description   A tooltip that can be used optionally.
 */
export declare function DisplayGroup(name: string, order?: number, description?: string): (target: Object, property: string | symbol) => void;
export declare function displayGroupInternalSetup(target: any, key: string, name: string, order: number, description: string): void;
