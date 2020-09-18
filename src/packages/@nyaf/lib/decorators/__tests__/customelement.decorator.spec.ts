import { CustomElement } from '../customelement.decorator';
import { isFunction } from 'util';
import { CustomElement_Symbol_Selector } from '../../consts/decorator.props';

test('CustomElement decorator', () => {
  const dec = CustomElement('app-name');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[CustomElement_Symbol_Selector]).not.toBeUndefined();
  expect(mockObj[CustomElement_Symbol_Selector]).toEqual('app-name');
});
