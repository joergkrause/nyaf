import { Expand } from './expand.decorator';
import { isFunction } from 'util';

test('Expands decorator', () => {
  const dec = Expand('expander');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  const fn = () => { dec(mockObj); };
  expect(fn).toThrowError(Error);
});

test('valid obj with enhanced prototype', () => {
  const dec = Expand('expander');
  function mockClass() { }
  dec(mockClass);
  expect(mockClass.prototype['__expand__']).not.toBeUndefined();
  expect(mockClass.prototype['__expand__']).toEqual('expander');
  const testMock = new mockClass();
  expect(testMock['__expand__']).not.toBeUndefined();
  expect(testMock['__expand__']).toEqual('expander');
});
