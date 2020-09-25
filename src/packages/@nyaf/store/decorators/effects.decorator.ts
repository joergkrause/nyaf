import { BaseComponent } from '@nyaf/lib';
import { EffectsBinder } from '../store/effectsbinder.class';
import { Effect } from '../interfaces/effect.interface';
import { Effects_Symbol, CTOR, Effects_Symbol_Ctor } from '../consts/decorator.props';

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
    if (!targetPrototype[Effects_Symbol]) {
      Object.defineProperty(targetPrototype, Effects_Symbol, {
        get: () => effectsMap,
        enumerable: false,
        configurable: false
      });
    }
    // trigger the call in the basecomponent ctor to get a valid this instance
    Object.defineProperty(targetPrototype, CTOR, {
      value: targetPrototype[CTOR]
        ? [Effects_Symbol_Ctor, ...targetPrototype[CTOR]]
        : [Effects_Symbol_Ctor],
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(targetPrototype, Effects_Symbol_Ctor, {
      set: (c: BaseComponent) => EffectsBinder.initialize(c),
      enumerable: false,
      configurable: false
    });

  };
}
