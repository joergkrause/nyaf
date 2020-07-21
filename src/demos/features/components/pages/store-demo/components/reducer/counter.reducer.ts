import { counterStoreType } from '../store/counter.store';
import { INC, DEC, SET } from '../actions/counter.actions';

/**
 * The reducer functions are the executing logic. They "do" what the action is asking for.
 */
export const counterReducer = {
  /**
   * The increment action takes the current state, operates as requested and returns the state for storage.
   */
  [INC]: (state: counterStoreType, payload: number): Partial<counterStoreType> => {
    const counter = state.counter + payload;
    return  { counter };
  },
  /**
   * The decrement action takes the current state, operates as requested and returns the state for storage.
   */
  [DEC]: (state: counterStoreType, payload: number): Partial<counterStoreType> => {
    const counter = state.counter - payload;
    return { counter };
  }
};

export const setReducer = {
  [SET]: (state: counterStoreType, payload: number): Partial<counterStoreType> => {
    const counter = payload;
    return { counter };
  }
};
