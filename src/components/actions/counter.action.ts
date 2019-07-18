export const INC = 'INC';
export const DEC = 'DEC';
export const SET = 'SET';

export default {
  [INC]: () => 1, // initial value of payload
  [DEC]: () => -1,
  [SET]: () => 0
};
