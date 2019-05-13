/**
 * The ShadowDOM decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
 * @param useShadow     set to true
 */
export function ShadowDOM(useShadow: boolean = true) {
    // the original decorator
    function shadowDOMInternal(target: Object, property: string | symbol): void {
      shadowDOMInternalSetup(target, property.toString(), useShadow);
    }

    // return the decorator
    return shadowDOMInternal;
}

export function shadowDOMInternalSetup(target: any, key: string, useShadow: boolean) {

    Object.defineProperty(target, 'withShadowDOM', {
        value: useShadow,
        enumerable: false,
        configurable: false
    });
}
