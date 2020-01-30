/**
 * Action definition for the increment task.
 */
export const INC = 'INC';
/**
 * Action definition for the decrement task.
 */
export const DEC = 'DEC';
/**
 * Action definition for the set task.
 */
export const SET = 'SET';

/**
 * The defaults that we use as long as the code hasn't sent anything.
 */
export default {
  [INC]: () => 1, // initial value of payload
  [DEC]: () => -1,
  [SET]: () => 0
};
