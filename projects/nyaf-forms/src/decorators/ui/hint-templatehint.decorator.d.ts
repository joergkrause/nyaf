/**
 * The Template decorator.
 *
 * One can define the way a property gets rendered.
 * Currently supported:
 *  - TextArea
 *  - Calendar
 *  - Range
 *  - Number
 *  - Text
 *
 * The Calendar creates Date-fielsd. However, in casde of a datatype Date the date field will be created anyway.
 *
 * @param template        The Name that appears in form fields as a watermark.
 * @param params          Depending of template some additional values as a dictionary.
 */
export declare function TemplateHint(template: string, params?: {
    key: string;
    value: any;
}[]): (target: Object, name: string) => void;
export declare function templateHintInternalSetup(target: any, key: string, template: string, params?: {
    key: string;
    value: any;
}[]): void;
