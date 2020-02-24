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

export function propInternalSetup<T>(target: any, defaults: T) {
  // setting in ctor makes it static
  if (!target.constructor.observedAttributes) {
    Object.defineProperty(target.constructor, 'observedAttributes', {
      get: function () {
        return Object.keys(defaults);
      },
      enumerable: false,
      configurable: false
    });
  } else {
    Object.assign(target.constructor.observedAttributes, defaults);
  }
  // control of properties used as state
  Object.defineProperty(target, 'observedAttributes', {
    get: function () {
      return Object.keys(defaults);
    },
    enumerable: false,
    configurable: false
  });
}
