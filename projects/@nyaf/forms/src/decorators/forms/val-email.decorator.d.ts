/**
 * Validates a field against an email pattern.
 * Based on "pattern", so in form one must use hasError('pattern') to get validation results.
 *
 * @param msg: A custom message. If not provided "The field ffff must contain a valid e-mail address."
 *             will be generated, while ffff is the property name.
 *
 */
export declare function Email(msg?: string): (target: Object, property: string | symbol) => void;
export declare function emailInternalSetup(target: any, key: string, msg?: string): void;
