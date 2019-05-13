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
export declare function Display(name: string, order?: number, description?: string): (target: Object, property: string | symbol) => void;
export declare function displayInternalSetup(target: any, key: string, name: string, order: number, description: string): void;
