import { Type } from '@nyaf/lib';
import { Notif } from '../classes/notif.class';

/**
 * Allows an event driven mechanism to dispatch actions. The decorator takes an array of effect definitions,
 * that add events to elements and forward properties to actions. That way one cna define a whole range of
 * actions outside of the view code and simplify the appearance of compnents.
 */
export function Notifications<T = any>(messagetype: Type<T>) {
  return function (target: any) {
    const targetPrototype = target.prototype;
    if (!targetPrototype) {
      throw new Error('Decorator must be run on an instanciable component.');
    }
    if (!targetPrototype[`notification`]) {
      Object.defineProperty(targetPrototype, `notification`, {
        get: () => new Notif<typeof messagetype>(),
        enumerable: false,
        configurable: false
      });
    }
  };
}
