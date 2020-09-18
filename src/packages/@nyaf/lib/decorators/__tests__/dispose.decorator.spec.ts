import { Dispose } from '../dispose.decorator';
import { isFunction } from 'util';

test('Dispose decorator', () => {
  const mockfactory = () => {
    return {
      remove: () => { }
    };
  };
  const dec = Dispose(mockfactory);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  const prop = 'testProp';
  dec(mockObj, prop);
  expect(mockObj[`__dispose__${prop}__`]).not.toBeUndefined();
  expect(mockObj[`__dispose__${prop}__`]).toEqual(mockfactory);
});
