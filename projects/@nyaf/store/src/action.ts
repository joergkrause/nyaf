import { StoreService } from './store.service';

/**
 * Action describes a piece of data that goes into the store and / or invokes a particular execution function (the reducer)
 */
export class Action {
  type: string;
  payload?: any;

  /**
   * A helper function to create d dispatchable action.
   * Such an action can dispatch itself against the store service.
   *
   * @param type Name of the action
   */
  static createAction(type: string) {
    if (!type) {
      throw new Error('Please, provide action\'s type as a string constant.');
    } else {
      return (payload: any) => {
        return StoreService.getInstance().dispatch({ type: type, payload: payload });
      };
    }
  }
}
