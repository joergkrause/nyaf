import { INC, DEC } from '../actions/counter.action';
import stateType from '../states/counter.state';

export default {
    // get state, modify, return
    [INC]: (state: stateType, payload: number) => {
      state.counter = state.counter + payload;
      return state;
    },
    [DEC]: (state: stateType, payload: number) => {
      state.counter = state.counter - payload;
      return state;
    }
};
