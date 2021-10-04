/**
 * The Display decorator.
 *
 * This decorator can be used on fields. It's being used to create label in forms and headers in the grid.
 * Additional parameters are provided to refine forms further.
 *
 * @param text          The Name or Label that appears in forms or as header in grids.
 * @param order         If one uses AcAutoForm to create a whole form from a model, this controls the element's order.
 * @param description   A tooltip that can be used optionally.
 */
export function Display(text: string, order: number = 0, description?: string) {
  // the original decorator
  function displayInternal(target: Object, property: string | symbol): void {
    displayInternalSetup(target, property.toString(), text, order, description);
  }

  // return the decorator
  return displayInternal;
}

export function displayInternalSetup(target: any, key: string, text: string, order: number, description: string) {
  order = parseInt(order.toString(), 10);
  // create a helper property to transport a meta data value
  Object.defineProperty(target, `${Display.text}${key}`, {
    value: text,
    enumerable: false,
    configurable: false,
    writable: true
  });

  Object.defineProperty(target, `${Display.order}${key}`, {
    value: order,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(target, `${Display.desc}${key}`, {
    value: description,
    enumerable: false,
    configurable: false,
    writable: true
  });
}

// helper for model binder to have typed access to underlying properties
Display.text = '__displayText__';
Display.order = '__displayOrder__';
Display.desc = '__displayDesc__';
