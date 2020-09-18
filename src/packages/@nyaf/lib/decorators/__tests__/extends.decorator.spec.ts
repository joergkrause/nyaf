import { Extends } from '../extends.decorator';
import { isFunction } from 'util';
import { Extends_Symbol } from '../../consts/decorator.props';

test('Extends decorator', () => {
  const dec = Extends('a');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[Extends_Symbol]).not.toBeUndefined();
  expect(mockObj[Extends_Symbol]).toEqual('a');
});
