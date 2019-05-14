/**
 * Validates a field against an range. Applies to numerical values or dates.
 *
 * The range's values are included in the valid range.
 *
 * @param from  The minimum value (included) as number or Date
 * @param to    The maximum value (included) as number or Date
 * @param msg   A custom message. If not provided "The field [field] does not fall into the range from [from] to [to]"
 *              will be generated, while [field] is the propertie's name.
 */
export declare function Range(from: number | Date, to: number | Date, msg?: string): (target: Object, property: string | symbol) => void;
export declare function rangeInternalSetup(target: any, key: string, from: number | Date, to: number | Date, msg?: string): void;
