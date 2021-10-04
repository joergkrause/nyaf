import { ShadowDOM_Symbol_WithShadow } from '../consts/decorator.props';

/**
 * The ShadowDOM decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
 * @param closed  Set to true if you want a closed component. Default is `false`.
 */
export function ShadowDOM(closed: boolean = false) {
    // the original decorator
    function shadowDOMInternal(target: Object): void {
      shadowDOMInternalSetup(target, closed);
    }

    // return the decorator
    return shadowDOMInternal;
}

/** @ignore */
function shadowDOMInternalSetup(target: any, closed: boolean) {

    Object.defineProperty(target, ShadowDOM_Symbol_WithShadow, {
        value: !closed,
        enumerable: false,
        configurable: false
    });
}
