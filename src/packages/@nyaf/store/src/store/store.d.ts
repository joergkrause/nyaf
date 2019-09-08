import { Observer } from '@nyaf/lib';
export interface StoreParams<ST> {
    actions: {
        [key: string]: any;
    };
    reducer: {
        [key: string]: (state: any, payload: any) => void;
    };
    state: ST;
}
export declare class Store<ST> extends Observer {
    private actions;
    private reducer;
    private _status;
    private state;
    constructor(params: StoreParams<ST>);
    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {any} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey: string, payload: any): boolean;
    readonly status: string;
}
