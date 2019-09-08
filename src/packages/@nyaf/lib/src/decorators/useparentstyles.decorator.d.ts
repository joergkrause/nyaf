/**
 * The UseParentStyles decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
 * @param useShadow     set to true
 */
export declare function UseParentStyles(useParentStyles?: boolean): (target: Object) => void;
export declare function useParentStylesInternalSetup(target: any, useParentStyles: boolean): void;
