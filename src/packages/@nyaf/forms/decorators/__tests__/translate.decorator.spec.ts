import { Translate } from '../translate.decorator';
import { isFunction } from 'util';

test('Translate signature', () => {
  expect(isFunction(Translate)).toBeTruthy();
});

