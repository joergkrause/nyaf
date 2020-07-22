/**
 * The Properties decorator.
 *
 * Properties decorated with this are now observed attributes.
 *
 */
export function Properties<T extends {}>(defaults: T) {
  // the original decorator
  function propInternal(target: Object): void {
    propInternalSetup<T>(target, defaults);
  }

  // return the decorator
  return propInternal;
}

/** @ignore */
function propInternalSetup<T>(target: any, defaults: T) {
  Object.defineProperty(target, '__observedAttributes__', {
    get: function () {
      return Object.keys(defaults);
    },
    enumerable: false,
    configurable: false
  });
  Object.defineProperty(target, '__proxyInitializer__', {
    get: function () {
      return defaults;
    },
    enumerable: false,
    configurable: false
  });
}
