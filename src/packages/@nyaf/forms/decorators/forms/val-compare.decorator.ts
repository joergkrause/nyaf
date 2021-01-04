/**
 * The compare decorator compares two field's values and
 * shows an error message on the decorated field. The other field (compared to) does
 * not has a decorator nor receives a message.
 *
 * @param withProperty: A string that represents the compared field's name.
 * @param msg: A custom message.
 *
 */
export function Compare(withProperty: string, msg?: string) {
  // the original decorator
  function compareInternal(target: Object, property: string | symbol): void {
    compareInternalSetup(target, property.toString(), withProperty, msg);
  }

  // return the decorator
  return compareInternal;
}

/**
 * @ignore
 */
function compareInternalSetup(target: any, key: string, withProperty: string, msg?: string) {

  // create a helper property to transport a meta data value
  Object.defineProperty(target, `__has__${Compare.internal}__${key}`, {
    value: true,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__to__${Compare.internal}__${key}`, {
    value: withProperty,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__err__${Compare.internal}__${key}`, {
    value: msg
      || `The field ${key} must have the same value as field ${withProperty}.`,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__isValid__${Compare.internal}__${key}`, {
    get: function () {
      return this[key] === this[withProperty];
    },
    enumerable: false,
    configurable: false
  });
}

Compare.internal = 'compare';
Compare.err = '__err__compare__';
Compare.to = '__to__compare__';