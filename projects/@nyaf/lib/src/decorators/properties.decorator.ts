/**
 * The Properties decorator.
 *
 * If decorated, the component uses or not uses shadow DOM according the parameter.
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
  Object.defineProperty(target, 'props', {
    value: function() {
      const props = {};
      const defs = Object.keys(defaults);
      defs.forEach(d => (props[d] = target.readAttribute(d, defaults[d])));
      return props;
    },
    enumerable: false,
    configurable: false
  });
  // this.props = {
  // 	title: this.readAttribute('title', 'Anzeigen'),
  // 	tabs: this.readAttribute('tabs', [])
  // };
}
