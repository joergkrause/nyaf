import { Sortable } from '../hint-sortable.decorator';
import { isFunction } from '@nyaf/lib';

describe('Sortable decorator', () => {
  it('default', () => {
    const dec = Sortable();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Sortable.is}${testProp}`]).toEqual(true);
  });
  it('explicit true', () => {
    const dec = Sortable(true);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Sortable.is}${testProp}`]).toEqual(true);
  });
  it('explicit false', () => {
    const dec = Sortable(false);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Sortable.is}${testProp}`]).toEqual(false);
  });
})