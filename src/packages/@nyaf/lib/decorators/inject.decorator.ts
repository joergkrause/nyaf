import { ServiceType, Constructor } from '../types/servicetype';

/**
 * Gives a component access to an injectable service. That is, any sort of class's instances.
 * Use the access within the component by decorating a property with this decorator.
 *
 * @example
 * ```
 * // in the class body
 * @Inject<MyService>(MyService) serviceField;
 *
 * // access later
 * this.serviceField.actionOnService();
 * ```
 *
 * @param type Type of service class. Any type that can make an instance will do (`function`, `class`) if you instantiate the service implicitly.
 *             If you use a singleton, the type {@link ServiceType<T>} is being used. The singleton variant is recommended.
 * @param singleton If set to @true the type must be an instance, that will be re-used accross calls,
 *                  if @false or omitted an instance will be created using new operator.
 */
export function Inject<T extends Constructor<{}> = any>(type: ServiceType<T> | T, singleton: boolean = false) {
  return function (target: any, property: string | symbol) {
    const t = singleton ? (type as ServiceType<T>).instance : new (type as T)();
    Object.defineProperty(target, property, {
      get: function () {
        return t;
      }
    });
  };
}
