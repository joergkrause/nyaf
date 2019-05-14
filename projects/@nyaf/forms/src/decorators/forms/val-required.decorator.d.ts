/**
 * This decorator is for validation of mandatory fields.
 * The default message is 'The field {keyName} is required'.
 *
 * @param msg The error message shown in case of error. A default value is being provided if omitted.
 *
 */
export declare function Required(msg?: string): (target: Object, property: string | symbol) => void;
export declare function requiredInternalSetup(target: any, key: string, msg?: string): void;
