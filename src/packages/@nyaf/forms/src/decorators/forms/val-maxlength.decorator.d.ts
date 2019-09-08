/**
 * The maxlength decorator assures that a string field contains not more than a number of characters.
 *
 * @param len: the maximum length.
 * @param msg: A custom message.
 *
 */
export declare function MaxLength(len: number, msg?: string): (target: Object, property: string | symbol) => void;
export declare function maxLengthInternalSetup(target: any, key: string, len: number, msg?: string): void;
