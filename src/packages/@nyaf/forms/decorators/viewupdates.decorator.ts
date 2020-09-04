import { BaseComponent } from '@nyaf/lib';
import { ViewUpdate } from '../interfaces/viewupdate.interface';
import { ModelBinder } from '../modelbinder/modelbinder.class';

/**
 * Provides the ability to move all binding instructions to one decorator.
 * This is syntactic sugar only and shall move a hard to maintain number of
 * binding instruction to one central location.
 *
 * This decorator must be added **after** the {@link ViewModel} decorator.
 *
 * @example
 * ~~~
 * @ViewModel(MyModel)
 * @ViewUpdate<MyModel>(
 * [
 *   {
 *   }
 * ])
 * ~~~
 *
 * To activate the binding, first remove all manual bindings. Add the bindings
 * as an array of ViewUpdate objects.
 *
 */
export function ViewUpdates<T extends object>(updatesMap: ViewUpdate<T, HTMLElement>[]) {
  return function (target: any) {
    const targetPrototype = target.prototype;
    if (!targetPrototype) {
      throw new Error('Decorator must be run on an instanciable component.');
    }
    if (!updatesMap || updatesMap.length === 0) {
      throw new Error('You must provide an array with at least one Update object.');
    }
    // store the effect binder instance itself
    if (!targetPrototype[`__viewupdates__`]) {
      Object.defineProperty(targetPrototype, `__viewupdates__`, {
        get: () => updatesMap,
        enumerable: false,
        configurable: false
      });
    }
    // trigger the call in the basecomponent ctor to get a valid this instance
    Object.defineProperty(targetPrototype, `__ctor__`, {
      value: targetPrototype.__ctor__ ? ['__viewupdates_ctor__', ...targetPrototype.__ctor__] : ['__viewupdates_ctor__'],
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(targetPrototype, `__viewupdates_ctor__`, {
      value: (c: BaseComponent) => ModelBinder.initupdates(c, c['__viewupdates__']),
      enumerable: false,
      configurable: false
    });

  };
}
