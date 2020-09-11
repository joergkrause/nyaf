/**
 * A helper class that supports the renderer.
 */
export class DomOp {
  /**
   * Get all of an element's parent elements up the DOM tree
   * @param  {Node}   elem     The element
   * @param  {String} selector Selector to match against [optional]
   * @return {Array}           The parent elements
   */
  static getParents(elem: any, selector: string) {
    // Setup parents array
    const parents = [];

    // Get matching parent elements
    for (; elem && elem !== document; elem = elem.parentNode) {
      // Add matching parents to array
      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem);
        }
      } else {
        parents.push(elem);
      }
    }

    return parents;
  }

  /**
   * Get the first parent that matches the selector, or null if there is none.
   * @param  {Node}   elem     The element
   * @param  {String} selector Selector to match against [optional]
   * @return {Node}   The parent element
   */
  static getParent(elem: any, selector: string) {
    const parents = DomOp.getParents(elem, selector);
    if (parents && parents.length) {
      return parents[0];
    }
    return null;
  }

  static getParentsUntil(elem: any, parent: any, selector: string) {
    // Setup parents array
    const parents = [];

    // Get matching parent elements
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (parent) {
        if (elem.matches(parent)) {
          break;
        }
      }

      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem);
        }
        break;
      }

      parents.push(elem);
    }

    return parents;
  }

  static getClosest(elem: any, selector: any ) {
    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) {
        return elem;
      }
    }

    return null;
  }
}
