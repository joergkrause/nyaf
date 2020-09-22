import { UseParentStyles } from '../useparentstyles.decorator';
import { isFunction } from '../../code/utils';
import { UseParentStyles_Symbol } from '../../consts/decorator.props';

test('UseParentStyles decorator', () => {
  const dec = UseParentStyles();
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[UseParentStyles_Symbol]).not.toBeUndefined();
  expect(mockObj[UseParentStyles_Symbol]).toEqual(true);
});

test('UseParentStyles decorator with styles', () => {
  const dec = UseParentStyles({
    default: 'body { color: red; }'
  });
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[UseParentStyles_Symbol]).not.toBeUndefined();
  expect(mockObj[UseParentStyles_Symbol]).toEqual('body { color: red; }');
});
