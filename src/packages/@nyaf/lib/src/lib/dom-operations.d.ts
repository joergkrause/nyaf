/**
 * A helper class that supports the renderer.
 */
export declare class DomOp {
    /**
     * Get all of an element's parent elements up the DOM tree
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against [optional]
     * @return {Array}           The parent elements
     */
    static getParents(elem: any, selector: string): any[];
    /**
     * Get the first parent that matches the selector, or null if there is none.
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against [optional]
     * @return {Node}   The parent element
     */
    static getParent(elem: any, selector: any): any;
    static getParentsUntil(elem: any, parent: any, selector: any): any[];
    static getClosest(elem: any, selector: any): any;
}
