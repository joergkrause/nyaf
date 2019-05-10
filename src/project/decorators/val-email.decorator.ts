/**
 * Validates a field against an email pattern.
 * Based on "pattern", so in form one must use hasError('pattern') to get validation results.
 *
 * @param msg: A custom message. If not provided "The field ffff must contain a valid e-mail address."
 *             will be generated, while ffff is the property name.
 *
 */
export function Email(msg?: string) {
  // the original decorator
  function emailInternal(target: Object, property: string | symbol): void {
    emailInternalSetup(target, property.toString(), msg);
  }

  // return the decorator
  return emailInternal;
}

export function emailInternalSetup(target: any, key: string, msg?: string) {

  // tslint:disable-next-line:max-line-length
  const pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // create a helper property to transport a meta data value
  Object.defineProperty(target, `__hasPattern__${key}`, {
    value: pattern,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__errPattern__${key}`, {
    value: msg || `The field ${key} must contain a valid e-mail address.`,
    enumerable: false,
    configurable: false
  });
}
