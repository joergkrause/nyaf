/**
 * Name the @see Expander by using this decorator.
 * @param prop value of expandable property
 */
export function Expand<T>(prop: string) {
  return function(target: any) {
    if (!target.prototype) {
      throw new Error('Decorator must be run on an instanciable class.');
    }
    Object.defineProperty(target.prototype, '__expand__', {
      get: function() {
        return prop;
      },
      configurable: false,
      enumerable: false
    });
  };
}
