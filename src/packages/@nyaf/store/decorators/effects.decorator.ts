import { BaseComponent } from '@nyaf/lib';
import { EffectsBinder } from '../store/effectsbinder.class';
import { Effect } from '../interfaces/effect.interface';

/**
 * Alloes an event driven mechanism to dispatch actions. The decorator takes an array of effect definitions,
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
    Object.defineProperty(targetPrototype, `__ctor__`, {
      value: '__effects_ctor__',
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(targetPrototype, `__effects_ctor__`, {
      set: (c: BaseComponent) => EffectsBinder.initialize(c),
      enumerable: false,
      configurable: false
    });

    // // make an instance on first request, this prop will become public through IModel interface
    // Object.defineProperty(targetPrototype, '__effects__', {
    //   get: function () {
    //     if (!target.__effectbinder__) {
    //       target.__effectbinder__ = {};
    //     }
    //     if (!target.__effectbinder__[$this.__uniqueId__]) {
    //       target.__effectbinder__[$this.__uniqueId__] = EffectsBinder.initialize($this /* the actual component */);
    //     }
    //     return target.__effectbinder__[$this.__uniqueId__];
    //   }
    // });
  };
}

function spy(F) {
  function G() {
    const args = Array.prototype.slice.call(arguments);
    G.calls.push(args);
    F.apply(this, args);
    EffectsBinder.initialize(F /* the actual component */);
  }

  G.prototype = F.prototype;
  G.calls = [];

  return G;
}