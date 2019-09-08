/**
 * The Properties decorator.
 *
 * Properties decorated with this are now observed attributes.
 *
 */
export declare function Properties<T extends {}>(defaults: T): (target: Object) => void;
export declare function propInternalSetup<T>(target: any, defaults: T): void;
