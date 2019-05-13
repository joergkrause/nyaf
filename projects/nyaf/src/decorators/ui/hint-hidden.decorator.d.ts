/**
 * The Hidden decorator.
 *
 * The @see `DataGrid` does not show columns for properties tagged with `@Hidden()`.
 * Fields in forms that render automatically
 * using the @see `AcEditor` component will render as <input type="hidden">.
 *
 * @param hide          Optional, default is true.
 */
export declare function Hidden(hide?: boolean): (target: Object, property: string | symbol) => void;
export declare function hiddenInternalSetup(target: any, key: string, hide: boolean): void;
