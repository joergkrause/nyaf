import { ProvideStore } from '../providestore.decorator';
import { isFunction } from 'util';

test('ProvideStore decorator', () => {
  const dec = ProvideStore(null);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
});
