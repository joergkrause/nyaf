/**
 * The ShadowDOM decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
 * @param useShadow     set to true
 */
export declare function ShadowDOM(useShadow?: boolean): (target: Object) => void;
export declare function shadowDOMInternalSetup(target: any, useShadow: boolean): void;
