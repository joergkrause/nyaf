/**
 * Action describes a piece of data that goes into the store and / or invokes a particular execution function (the reducer)
 */
export declare class Action {
    type: string;
    payload?: any;
    /**
     * A helper function to create d dispatchable action.
     * Such an action can dispatch itself against the store service.
     *
     * @param type Name of the action
     */
    static createAction(type: string): (payload: any) => void;
}
