import { isNumber } from '@nyaf/lib';

/**
 * Validates a field against an range. Applies to numerical values or dates.
 *
 * The range's values are included in the valid range.
 *
 * @param from  The minimum value (included) as number or Date
 * @param to    The maximum value (included) as number or Date
 * @param msg   A custom message. If not provided "The field [field] does not fall into the range from [from] to [to]"
 *              will be generated, while [field] is the propertie's name.
 */
export function Range(from: number | Date, to: number | Date, msg?: string) {
  // the original decorator
  function rangeInternal(target: Object, property: string | symbol): void {
    rangeInternalSetup(target, property.toString(), from, to, msg);
  }

  // return the decorator
  return rangeInternal;
}

/**
 * @ignore
 */
function rangeInternalSetup(target: any, key: string, from: number | Date, to: number | Date, msg?: string) {
  // property value

  // create a helper property to transport a meta data value
  Object.defineProperty(target, `__has__${Range.internal}__from__${key}`, {
    value: from,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__has__${Range.internal}__to__${key}`, {
    value: to,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__err__${Range.internal}__${key}`, {
    value: msg || `The field ${key} does not fall into the range from ${from} to ${to}.`,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `__isValid__${Range.internal}__${key}`, {
    get: function () {
      if (isNumber(target[key])) {
        return +target[key] >= from && +target[key] <= to;
      }
      if (target[key] instanceof Date) {
        const ts = (target[key] as Date).getTime();
        const fromts = from instanceof Date ? (from as Date).getTime() : from;
        const tots = to instanceof Date ? (to as Date).getTime() : to;
        return ts >= fromts && ts <= tots;
      }
      return false;
    },
    enumerable: false,
    configurable: false
  });
}

Range.internal = 'range';
