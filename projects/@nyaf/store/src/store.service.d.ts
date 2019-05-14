import { Store } from "./store";
import { Action } from "./action";
/**
 * The service that manages stores. Stores are the sinmgle point of truth for an application.
 * Ideally, you have just one, but it's possible to add more if the application gets more complex.
 */
export declare class StoreService {
    private static _instance;
    /**
     * Don't use instances, @see getInstance for details about using Singleton classes.
     */
    constructor(s: any);
    static getInstance(): StoreService;
    private _stores;
    readonly store: Store[];
    register(store: Store): void;
    subscribe(action: Action): void;
    dispatch(action: Action): void;
}
