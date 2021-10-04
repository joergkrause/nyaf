/**
 * The Dispose decorator.
 *
 * Assign to a property with an instruction what to do on dispose and the dispose function will call this implicitly.
 *
 */
export function Dispose(disposeFactory: (o: any) => void) {
  // the original decorator
  function disposeInternal(target: Object, prop: string): void {
    disposeInternalSetup(target, prop, disposeFactory);
  }

  // return the decorator
  return disposeInternal;
}

/** @ignore */
function disposeInternalSetup(target: any, prop: string, disposeFactory: (o: any) => void) {
  Object.defineProperty(target, `__dispose__${prop}__`, {
    get: function () {
      return disposeFactory;
    },
    enumerable: false,
    configurable: false
  });
}
