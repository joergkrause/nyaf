import { BaseComponent } from '@nyaf/lib';
import { EffectsBinder } from '../store/effectsbinder.class';
import { Effect } from '../interfaces/effect.interface';

/**
 * Allows an event driven mechanism to dispatch actions. The decorator takes an array of effect definitions,
 * that add events to elements and forward properties to actions. That way one cna define a whole range of
 * actions outside of the view code and simplify the appearance of compnents.
 */
export function Effects(effectsMap: Effect[]) {
  return function (target: any) {
    const targetPrototype = target.prototype;
    if (!targetPrototype) {
      throw new Error('Decorator must be run on an instanciable component.');
    }
    if (!effectsMap || effectsMap.length === 0) {
      throw new Error('You must provide an array with at least one Effect object.');
    }
    // store the effect binder instance itself
    if (!targetPrototype[`__effects__`]) {
      Object.defineProperty(targetPrototype, `__effects__`, {
        get: () => effectsMap,
        enumerable: false,
        configurable: false
      });
    }
    // trigger the call in the basecomponent ctor to get a valid this instance
    Object.defineProperty(targetPrototype, Symbol.for('__ctor__'), {
      value: targetPrototype[Symbol.for('__ctor__')] ? ['__effects_ctor__', ...targetPrototype[Symbol.for('__ctor__')]] : ['__effects_ctor__'],
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(targetPrototype, `__effects_ctor__`, {
      set: (c: BaseComponent) => EffectsBinder.initialize(c),
      enumerable: false,
      configurable: false
    });

  };
}
