import { ServiceType } from '../types/common';

/**
 * Gives a component access to an injectable service. That is, any sort of class's instances.
 * Use the access within the component the `services` property provides.
 *
 * @example this.services('myName')
 *
 * @param name local name (within component) of service
 * @param type Type of service class. Any type that can make an instance will do (`function`, `class`)
 * @param singleton If set to @true the type must be an instance, that will be re-used accross calls,
 *                  if @false or omitted an instance will be created using new operator.
 */
export function InjectService<T>(name: string, type: ServiceType<T>, singleton: boolean = false) {
  return function (target: any) {
    // setup for multiple
    if (!target.prototype['_services']) {
      target.prototype['_services'] = new Map<string, any>();
    }
    if (!(<Map<string, any>>target.prototype['_services']).has(name)) {
      const t = singleton ? type : new type();
      (<Map<string, any>>target.prototype['_services']).set(name, t);
    }
    // we define the access on "this" level, but let the definition run on "super" level
    Object.defineProperty(target, 'services', {
      get: function () {
        return target.prototype['_services'];
      }
    });
  };
}
