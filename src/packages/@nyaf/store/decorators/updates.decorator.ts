import { BaseComponent } from '@nyaf/lib';
import { Update } from '../interfaces/update.interface';
import { UpdateProperty } from '../interfaces/updateproperty.interface';
import { UpdatesBinder } from '../store/updatesbinder.class';

/**
 * Allows an event driven mechanism to dispatch actions. The decorator takes an array of effect definitions,
 * that add events to elements and forward properties to actions. That way one cna define a whole range of
 * actions outside of the view code and simplify the appearance of compnents.
 */
export function Updates<T>(updatesMap: Array<Update<T> | UpdateProperty<T, any>>) {
  return function (target: any) {
    const targetPrototype = target.prototype;
    if (!targetPrototype) {
      throw new Error('Decorator must be run on an instanciable component.');
    }
    if (!updatesMap || updatesMap.length === 0) {
      throw new Error('You must provide an array with at least one Update object.');
    }
    // store the effect binder instance itself
    if (!targetPrototype[`__updates__`]) {
      Object.defineProperty(targetPrototype, `__updates__`, {
        get: () => updatesMap,
        enumerable: false,
        configurable: false
      });
    }
    // trigger the call in the basecomponent ctor to get a valid this instance
    Object.defineProperty(targetPrototype, Symbol.for('__ctor__'), {
      value: targetPrototype[Symbol.for('__ctor__')] ? ['__updates_ctor__', ...targetPrototype[Symbol.for('__ctor__')]] : ['__updates_ctor__'],
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(targetPrototype, `__updates_ctor__`, {
      set: (c: BaseComponent) => UpdatesBinder.initialize(c),
      enumerable: false,
      configurable: false
    });

  };
}
