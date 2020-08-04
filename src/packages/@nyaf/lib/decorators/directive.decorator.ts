export function Directive(selector: string) {
  return function (target: any) {
    Object.defineProperty(target, 'selector', {
      get: () => {
        return selector;
      },
      enumerable: false,
      configurable: false
    });
  };
}
