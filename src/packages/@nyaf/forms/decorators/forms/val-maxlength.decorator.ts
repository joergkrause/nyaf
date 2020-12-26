/**
 * The maxlength decorator assures that a string field contains not more than a number of characters.
 *
 * @param len: the maximum length.
 * @param msg: A custom message.
 *
 */
export function MaxLength(len: number, msg?: string) {
  // the original decorator
  function maxLengthInternal(target: Object, property: string | symbol): void {
    maxLengthInternalSetup(target, property.toString(), len, msg);
  }

  // return the decorator
  return maxLengthInternal;
}

/**
 * @ignore
 */
function maxLengthInternalSetup(target: any, key: string, len: number, msg?: string) {

  // create a helper property to transport a meta data value
  Object.defineProperty(target, `__has__${MaxLength.internal}__${key}`, {
    value: true,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__pattern__${MaxLength.internal}__${key}`, {
    value: len,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__err__${MaxLength.internal}__${key}`, {
    value: msg || `The field ${key} has max length of ${len} characters.`,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__isValid__${MaxLength.internal}__${key}`, {
    get: function () {
      return this[key]?.toString().length <= len || false;
    },
    enumerable: false,
    configurable: false
  });
}

MaxLength.internal = 'maxlength';
MaxLength.err = '__err__maxlength__';