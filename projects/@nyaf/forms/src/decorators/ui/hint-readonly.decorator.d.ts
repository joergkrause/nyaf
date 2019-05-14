/**
 * The Readonly decorator. The field is readonly in the form. It just renders grayed out
 * and handles the internals using default HTML5 techniques.
 *
 *
 * @param readonly      Optional, default is true.
 * @param description   A tooltip that can be used optionally.
 */
export declare function Readonly(readonly?: boolean): (target: Object, property: string | symbol) => void;
export declare function readonlyInternalSetup(target: any, key: string, readonly: boolean): void;
