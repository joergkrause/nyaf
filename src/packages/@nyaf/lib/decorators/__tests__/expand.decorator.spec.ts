import { Expand } from '../expand.decorator';
import { isFunction } from 'util';
import { Expands_Symbol } from '../../consts/decorator.props';

test('Expands decorator', () => {
  const dec = Expand('expander');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  const fn = () => { dec(mockObj); };
  expect(fn).toThrowError(Error);
});

test('Expands decorator enhanced prototype', () => {
  const dec = Expand('expander');
  function mockClass() { }
  dec(mockClass);
  expect(mockClass.prototype[Expands_Symbol]).not.toBeUndefined();
  expect(mockClass.prototype[Expands_Symbol]).toEqual('expander');
  const testMock = new mockClass();
  expect(testMock[Expands_Symbol]).not.toBeUndefined();
  expect(testMock[Expands_Symbol]).toEqual('expander');
});
