/**
 * The decorator assures that a string field fullfilles a regular expression pattern.
 *
 * @param pattern: The expression as RegExp.
 * @param msg: A custom message.
 *
 */
export function Pattern(pattern: RegExp, msg?: string) {
  // the original decorator
  function patternInternal(target: Object, property: string | symbol): void {
    patternInternalSetup(target, property.toString(), pattern, msg);
  }

  // return the decorator
  return patternInternal;
}

/**
 * @ignore
 */
function patternInternalSetup(target: any, key: string, reg: RegExp, msg?: string) {
  // create a helper property to transport a meta data value
  Object.defineProperty(target, `__has__${Pattern.internal}__${key}`, {
    value: true,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__pattern__${Pattern.internal}__${key}`, {
    value: reg,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__err__${Pattern.internal}__${key}`, {
    value: msg || `The field ${key} must fullfill the pattern ${reg}.`,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__isValid__${Pattern.internal}__${key}`, {
    get: function () {
      return new RegExp(reg).test(this[key]);
    },
    enumerable: false,
    configurable: false
  });
}

Pattern.internal = 'pattern';
Pattern.pattern = '__pattern__pattern';
Pattern.err = '__err__pattern__';