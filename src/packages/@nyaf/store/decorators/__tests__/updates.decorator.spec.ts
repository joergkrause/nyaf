import { Updates } from '../updates.decorator';
import { isFunction } from 'util';

test('Updates decorator', () => {
  const dec = Updates(null);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
});
