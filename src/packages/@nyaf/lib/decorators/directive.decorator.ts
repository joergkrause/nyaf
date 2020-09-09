export function Directive(selector: string) {
  return function (target: any) {
    Object.defineProperty(target, Symbol.for('DirectiveSelector'), {
      get: () => {
        return selector;
      },
      enumerable: false,
      configurable: false
    });
  };
}
