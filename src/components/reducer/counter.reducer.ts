import { INC, DEC } from '../actions/counter.action';
import stateType from '../states/counter.state';

/**
 * The reducer functions are the executing logic. They "do" what the action is asking for.
 */
export default {
    /**
     * The increment action takes the current state, operates as requested and returns the state for storage.
     */
    [INC]: (state: stateType, payload: number) => {
      state.counter = state.counter + payload;
      return state;
    },
    /**
     * The decrement action takes the current state, operates as requested and returns the state for storage.
     */
    [DEC]: (state: stateType, payload: number) => {
      state.counter = state.counter - payload;
      return state;
    }
};
