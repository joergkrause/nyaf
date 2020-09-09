/**
 * The decorator that makes a class a Web Component. This decorstor is required on all components.
 *
 * @param name Name of component in HTML.
 **/
export function CustomElement(name: string) {
  return function (target: any) {
    Object.defineProperty(target, Symbol.for('CustomElementSelector'), {
      get: function () {
        return name;
      },
      enumerable: false,
      configurable: false
    });
  };
}

