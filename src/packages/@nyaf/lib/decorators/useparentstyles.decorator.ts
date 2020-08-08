/**
 * The UseParentStyles decorator.
 *
 * Applies external styles to an element. This works with shadowed elements, even if there is no penetrating pseudo selector.
 *
 * @param useStyles  if emopty the element copies all parent styles in the document. If filled with styles, only these are applied to the component.
 */
// export function UseParentStyles(useStyles?: { new(): StyleSheet; prototype: StyleSheet; }) {
export function UseParentStyles(useStyles?: any) {
    // the original decorator
  function useParentStylesInternal(target: Object): void {
    if (useStyles) {
      const css = useStyles.default;
      useParentStylesInternalSetup(target, false, css);
    } else {
      useParentStylesInternalSetup(target, true);
    }
    }

    // return the decorator
    return useParentStylesInternal;
}

/** @ignore */
function useParentStylesInternalSetup(target: any, parentOnly: boolean, useStyles?: StyleSheet) {

    Object.defineProperty(target, 'useParentStyles', {
        value: parentOnly ? true : useStyles,
        enumerable: false,
        configurable: false
    });
}
