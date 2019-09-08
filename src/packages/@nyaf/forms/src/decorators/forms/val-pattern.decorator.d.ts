/**
 * The decorator assures that a string field fullfilles a regular expression pattern.
 *
 * @param pattern: The expression as RegExp.
 * @param msg: A custom message.
 *
 */
export declare function Pattern(pattern: RegExp, msg?: string): (target: Object, property: string | symbol) => void;
export declare function patternInternalSetup(target: any, key: string, reg: RegExp, msg?: string): void;
