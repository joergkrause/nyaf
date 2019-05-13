/**
 * The Placeholder decorator.
 *
 * The placeholder adds the given text as a watermark to any input fields.
 * There is no function in DataGrid.
 *
 * @param name          The Name that appears in form fields as a watermark.
 */
export declare function Placeholder(name: string): (target: Object, property: string | symbol) => void;
export declare function placeholderInternalSetup(target: any, key: string, name: string): void;
