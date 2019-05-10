/**
 * The maxlength decorator assures that a string field contains not more than a number of characters.
 *
 * @param len: the maximum length.
 * @param msg: A custom message.
 *
 */
export function MaxLength(len: number, msg?: string) {
    // the original decorator
    function maxLengthInternal(target: Object, property: string | symbol): void {
        maxLengthInternalSetup(target, property.toString(), len, msg);
    }

    // return the decorator
    return maxLengthInternal;
}

export function maxLengthInternalSetup(target: any, key: string, len: number, msg?: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasMaxLength__${key}`, {
        value: len,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__errMaxLength__${key}`, {
        value: msg || `The field ${key} has max length of ${len} characters`,
        enumerable: false,
        configurable: false
    });

}
