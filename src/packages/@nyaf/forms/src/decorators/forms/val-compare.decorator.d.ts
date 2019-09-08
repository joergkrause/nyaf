/**
 * The compare decorator compares two field's values and
 * shows an error message on the decorated field. The other field (compared to) does
 * not has a decorator nor receives a message.
 *
 * @param withProperty: A string that represents the compared field's name.
 * @param msg: A custom message.
 *
 */
export declare function Compare(withProperty: string, msg?: string): (target: Object, property: string | symbol) => void;
export declare function compareInternalSetup(target: any, key: string, withProperty: string, msg?: string): void;
