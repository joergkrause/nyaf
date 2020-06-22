import { CustomElement } from './customelement.decorator';
import { isFunction } from 'util';

test('CustomElement decorator', () => {
  const dec = CustomElement('app-name');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj.selector).not.toBeUndefined();
  expect(mockObj.selector).toEqual('app-name');
});
