/**
 * The decorator that assures that a string field contains at least a number of characters and a minimum number, too.
 * The default message is 'The field {fieldname} needs at least {minlength} characters'.
 *
 * @param min: The required length.
 * @param max: The maximum length.
 * @param msg: Optionally a custom message.
 *
 */
export function StringLength(min: number, max: number, msg?: string) {
    // the original decorator
    function stringLengthInternal(target: Object, property: string | symbol): void {
        stringLengthInternalSetup(target, property.toString(), min, max, msg);
    }

    // return the decorator
    return stringLengthInternal;
}

export function stringLengthInternalSetup(target: any, key: string, min: number, max: number, msg?: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasMaxLength__${key}`, {
        value: max,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__errMaxLength__${key}`, {
        value: msg || `The field ${key} has max length of ${max} characters`,
        enumerable: false,
        configurable: false
    });

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasMinLength__${key}`, {
        value: min,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__errMinLength__${key}`, {
        value: msg || `The field ${key} needs at least ${min} characters`,
        enumerable: false,
        configurable: false
    });

}
