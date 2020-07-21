import { SETTAB } from '../actions/global.actions';
import { globalStoreType } from '../store/global.store';

/**
 * The reducer functions are the executing logic. They "do" what the action is asking for.
 */
export default {
  [SETTAB]: async (state: globalStoreType, payload: string) => {
    return { tab: payload };
  }
};
