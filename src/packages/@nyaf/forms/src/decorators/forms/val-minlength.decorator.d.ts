/**
 * The minlength decorator assures that a string field contains at least a number of characters.
 *
 * @param len: the required length.
 * @param msg: A custom message.
 *
 */
export declare function MinLength(len: number, msg?: string): (target: Object, property: string | symbol) => void;
export declare function minLengthInternalSetup(target: any, key: string, len: number, msg?: string): void;
