import { BindName } from '../bindname.decorator';
import { isFunction } from '@nyaf/lib';

class Binder {
  name: string = '';
}

test('bindname signature', () => {
  const dec = BindName('test');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = new Binder();
  dec(mockObj);
  expect(mockObj[Symbol.for('bindingname')]).toEqual('test');
});
