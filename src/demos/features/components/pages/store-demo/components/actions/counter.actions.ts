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
 * The defaults that we use in case a reducer doesn'Ä't exists. This usually set's a default. It's mandatory.
 */
export const actions = {
  [INC]: () => 1, // initial value of payload
  [DEC]: () => -1,
  [SET]: () => 0
};
