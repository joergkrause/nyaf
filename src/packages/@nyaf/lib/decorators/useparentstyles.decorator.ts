/**
 * The UseParentStyles decorator.
 *
 * Applies external styles to an element. This works with shadowed elements, even if there is no penetrating pseudo selector.
 *
 * @param useStyles  if emopty the element copies all parent styles in the document. If filled with styles, only these are applied to the component.
 */
export function UseParentStyles(useStyles?: StyleSheet) {
    // the original decorator
    function useParentStylesInternal(target: Object): void {
      useParentStylesInternalSetup(target, useStyles);
    }

    // return the decorator
    return useParentStylesInternal;
}

/** @ignore */
function useParentStylesInternalSetup(target: any, useStyles: StyleSheet) {

    Object.defineProperty(target, 'useParentStyles', {
        value: useStyles ?? true,
        enumerable: false,
        configurable: false
    });
}
