/**
 * The decorator that assures that a string field contains at least a number of characters and a minimum number, too.
 * The default message is 'The field {fieldname} needs at least {minlength} characters'.
 *
 * @param min: The required length.
 * @param max: The maximum length.
 * @param msg: Optionally a custom message.
 *
 */
export declare function StringLength(min: number, max: number, msg?: string): (target: Object, property: string | symbol) => void;
export declare function stringLengthInternalSetup(target: any, key: string, min: number, max: number, msg?: string): void;
