/**
 * Return of Select decorator in case of a list.
 */
export interface QueryList<T extends HTMLElement> {
  length: number;
  first: T;
  last: T;
  items: T[];
}

/**
 * Select an element and assign to property.
 * @param selector Any selector used by `querySelector`.
 */
export function Select(selector: string, many = false) {
  return function (target: any, prop: string) {
    Object.defineProperty(target, prop, {
      get: function () {
        const all: any = (n: NodeList) => {
          const a = Array.from(n).map(e => e as HTMLElement);
          return {
            length: a.length,
            first: a.length > 0 ? a[0] as HTMLElement : null,
            last: a.length > 0 ? a[a.length - 1] as HTMLElement : null,
            items: a
          };
        };
        if (this.constructor['withShadow']) {
          return many ? all(this.shadowRoot.querySelectorAll(selector)) : this.shadowRoot.querySelector(selector);
        } else {
          return many ? all(this.querySelectorAll(selector)) : this.querySelector(selector);
        }
      },
      enumerable: false,
      configurable: false
    });
  };
}
