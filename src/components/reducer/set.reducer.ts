import { SET } from '../actions/counter.action';
import stateType from '../states/counter.state';

export default {
    [SET]: (state: stateType, payload: number) => {
      state.counter = payload;
      return state;
    }
};
