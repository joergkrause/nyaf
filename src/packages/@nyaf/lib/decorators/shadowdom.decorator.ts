import { ShadowDOM_Symbol_WithShadow } from '../consts/decorator.props';

/**
 * The ShadowDOM decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
 * @param useShadow     set to true
 */
export function ShadowDOM(useShadow: boolean = true) {
    // the original decorator
    function shadowDOMInternal(target: Object): void {
      shadowDOMInternalSetup(target, useShadow);
    }

    // return the decorator
    return shadowDOMInternal;
}

/** @ignore */
function shadowDOMInternalSetup(target: any, useShadow: boolean) {

    Object.defineProperty(target, ShadowDOM_Symbol_WithShadow, {
        value: useShadow,
        enumerable: false,
        configurable: false
    });
}
