/**
 * The UseParentStyles decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
 * @param useShadow     set to true
 */
export function UseParentStyles(useParentStyles: boolean = true) {
    // the original decorator
    function useParentStylesInternal(target: Object): void {
      useParentStylesInternalSetup(target, useParentStyles);
    }

    // return the decorator
    return useParentStylesInternal;
}

/** @ignore */
function useParentStylesInternalSetup(target: any, useParentStyles: boolean) {

    Object.defineProperty(target, 'useParentStyles', {
        value: useParentStyles,
        enumerable: false,
        configurable: false
    });
}
