/**
 * This decorator is for validation of fields using a custom algorithm.
 * The default message is 'The field {keyName} is invalid'.
 *
 * @param cb A callback that has access to the entire object through `this` and must return a `boolean`
 * @param msg The error message shown in case of error. A default value is being provided if omitted.
 *
 */
export function Custom(cb: (o: any) => boolean, msg?: string) {
  // the original decorator
  function customInternal(target: Object, property: string | symbol): void {
    customInternalSetup(target, property.toString(), cb, msg);
  }

  // return the decorator
  return customInternal;
}

/**
 * @ignore
 */
function customInternalSetup(target: any, key: string, cb: (o: any) => boolean, msg?: string) {
  Object.defineProperty(target, `__has__${Custom.internal}__${key}`, {
    value: true,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__err__${Custom.internal}__${key}`, {
    value: msg || `The field ${key} is not valid.`,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__isValid__${Custom.internal}__${key}`, {
    get: function () {
      return cb.call(this, this);
    },
    enumerable: false,
    configurable: false
  });
}

Custom.internal = 'custom';
Custom.err = '__err__custom__';