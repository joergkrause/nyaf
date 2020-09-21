import { Effects } from '../effects.decorator';
import { isFunction } from 'util';

test('Effects decorator', () => {
  const dec = Effects(null);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
});
