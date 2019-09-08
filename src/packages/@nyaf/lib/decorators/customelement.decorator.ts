export function CustomElement(name: string) {
  return function(target: any) {
    Object.defineProperty(target, 'selector', {
      get: function() {
        return name;
      }
    });
  };
}
