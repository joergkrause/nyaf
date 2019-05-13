/**
 * The minlength decorator assures that a string field contains at least a number of characters.
 *
 * @param len: the required length.
 * @param msg: A custom message.
 *
 */
export function MinLength(len: number, msg?: string) {
    // the original decorator
    function minLengthInternal(target: Object, property: string | symbol): void {
        minLengthInternalSetup(target, property.toString(), len, msg);
    }

    // return the decorator
    return minLengthInternal;
}

export function minLengthInternalSetup(target: any, key: string, len: number, msg?: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasMinLength__${key}`, {
        value: len,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__errMinLength__${key}`, {
        value: msg || `The field ${key} needs at least ${len} characters`,
        enumerable: false,
        configurable: false
    });

}
