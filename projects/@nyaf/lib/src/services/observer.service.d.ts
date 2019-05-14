/**
 * Implement a simple pub/sub pattern to have components communication without attributes.
 * This class is Singleton, use getInstance to get the global obj.
 */
export declare class Observer {
    private topics;
    private hOP;
    constructor(s: any);
    private static _instance;
    static getInstance(): Observer;
    subscribe(topic: string, listener: Function): {
        remove: Function;
    };
    publish(topic: string, info: any): void;
}
