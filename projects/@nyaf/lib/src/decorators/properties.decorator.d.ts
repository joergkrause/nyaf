/**
 * The Properties decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
 *
  */
export declare function Properties<T extends {}>(defaults: T): (target: Object) => void;
export declare function propInternalSetup<T>(target: any, defaults: T): void;
