/**
 * The Properties decorator.
 *
 * Properties decorated with this are now observed attributes.
 *
 */
export function Properties<T extends {}>(defaults: T) {
  // the original decorator
  function propInternal(target: Object): void {
    propInternalSetup<T>(target, defaults);
  }

  // return the decorator
  return propInternal;
}

export function propInternalSetup<T>(target: any, defaults: T) {
  Object.defineProperty(target, 'observedAttributes', {
    get: function() {
      return Object.keys(defaults);
    },
    enumerable: false,
    configurable: false
  });
  // this.props = {
  // 	title: this.readAttribute('title', 'Anzeigen'),
  // 	tabs: this.readAttribute('tabs', [])
  // };
}
