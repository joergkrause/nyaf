/**
* The AddClassToCell decorator.
*
* If the corresponding property is true the class will be applied to the cell of the named property.
*
* @param prop        The property of the cell where the class has to be applied
* @param className   The class.
*/
export declare function AddClassToCell(prop: string, className: string): (target: Object, property: string | symbol) => void;
export declare function addClassToCellInternalSetup(target: any, key: string, prop: string, className: string): void;
