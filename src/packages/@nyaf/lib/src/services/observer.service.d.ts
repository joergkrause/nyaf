/**
 * Simple Publish Subscribe class. Used by @nyaf/store.
 */
export declare class Observer {
    events: any;
    constructor();
    /**
     * Either create a new event instance for passed `event` name
     * or push a new callback into the existing collection
     *
     * @param {string} event
     * @param {function} callback
     * @returns {number} A count of callbacks for this event
     * @memberof PubSub
     */
    subscribe(event: string, callback: (data: any) => void): any;
    /**
     * If the passed event has callbacks attached to it, loop through each one
     * and call it
     *
     * @param {string} event
     * @param {object} [data={}]
     * @returns {array} The callbacks for this event, or an empty array if no event exits
     * @memberof PubSub
     */
    publish(event: string, data?: {}): any;
}
