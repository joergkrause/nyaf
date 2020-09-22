import { ServiceType, Constructor } from '../types/servicetype';
import { InjectServices_Symbol } from '../consts/decorator.props';

/**
 * Gives a component access to an injectable service. That is, any sort of class's instances.
 * Use the access within the component the `services` property provides.
 *
 * @example
 * ```
 * @InjectService<MyService>('myName', MyService)
 * export class MyComponent extends BaseComponent {
 *   // access the service's instance like this:
 *   this.services('myName').actionOnService();
 * }
 * ```
 *
 * @param name local name (within component) of service
 * @param type Type of service class. Any type that can make an instance will do (`function`, `class`) if you instantiate the service implicitly.
 *             If you use a singleton, the type {@link ServiceType<T>} is being used. The singleton variant is recommended.
 * @param singleton If set to @true the type must be an instance, that will be re-used accross calls,
 *                  if @false or omitted an instance will be created using new operator.
 */
export function InjectService<T extends Constructor<{}> = any>(name: string, type: ServiceType<T> | T, singleton: boolean = false) {
  return function (target: any) {
    // setup for multiple
    if (!target.prototype[InjectServices_Symbol]) {
      target.prototype[InjectServices_Symbol] = new Map<string, any>();
    }
    if (!(<Map<string, any>>target.prototype[InjectServices_Symbol]).has(name)) {
      const t = singleton ? (type as ServiceType<T>).instance : new (type as T)();
      (<Map<string, any>>target.prototype[InjectServices_Symbol]).set(name, t);
    }
    // we define the access on "this" level, but let the definition run on "super" level
    if (!target.services) {
      Object.defineProperty(target, 'services', {
        get: function () {
          return target.prototype[InjectServices_Symbol];
        }
      });
    }
  };
}
