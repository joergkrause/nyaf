import { Filterable } from '../hint-filterable.decorator';
import { isFunction } from 'util';

describe('Filterable decorator', () => {
  it('default', () => {
    const dec = Filterable();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Filterable.is}${testProp}`]).toEqual(true);
  });
  it('explicit true', () => {
    const dec = Filterable(true);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Filterable.is}${testProp}`]).toEqual(true);
  });
  it('explicit false', () => {
    const dec = Filterable(false);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Filterable.is}${testProp}`]).toEqual(false);
  });
})