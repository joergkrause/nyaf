/**
 * The decorator assures that a string field fullfilles a regular expression pattern.
 * 
 * @param pattern: The expression as RegExp.
 * @param msg: A custom message.
 * 
 */
export function Pattern(pattern: RegExp, msg?: string) {
    // the original decorator
    function patternInternal(target: Object, property: string | symbol): void {
        patternInternalSetup(target, property.toString(), pattern, msg);
    }

    // return the decorator
    return patternInternal;
}

export function patternInternalSetup(target: any, key: string, reg: RegExp, msg?: string) {

    // create a helper property to transport a meta data value
    Object.defineProperty(target, `__hasPattern__${key}`, {
        value: reg,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(target, `__errPattern__${key}`, {
        value: msg || `The field ${key} must fullfill the pattern ${reg}`,
        enumerable: false,
        configurable: false
    });
}
