import { ShadowDOM } from '../shadowdom.decorator';
import { isFunction } from 'util';
import { ShadowDOM_Symbol_WithShadow } from '../../consts/decorator.props';

test('ShadowDOM decorator', () => {
  const dec = ShadowDOM();
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[ShadowDOM_Symbol_WithShadow]).not.toBeUndefined();
  expect(mockObj[ShadowDOM_Symbol_WithShadow]).toEqual(true);
});

test('ShadowDOM decorator true', () => {
  const dec = ShadowDOM(true);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[ShadowDOM_Symbol_WithShadow]).not.toBeUndefined();
  expect(mockObj[ShadowDOM_Symbol_WithShadow]).toEqual(true);
});

test('ShadowDOM decorator false', () => {
  const dec = ShadowDOM(false);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[ShadowDOM_Symbol_WithShadow]).not.toBeUndefined();
  expect(mockObj[ShadowDOM_Symbol_WithShadow]).toEqual(false);
});