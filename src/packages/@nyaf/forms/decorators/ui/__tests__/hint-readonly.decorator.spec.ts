import { Readonly } from '../hint-readonly.decorator';
import { isFunction } from '@nyaf/lib';

describe('Readonly decorator', () => {
  it('default', () => {
    const dec = Readonly();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Readonly.is}${testProp}`]).toEqual(true);
  });
  it('explicit true', () => {
    const dec = Readonly(true);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Readonly.is}${testProp}`]).toEqual(true);
  });
  it('explicit false', () => {
    const dec = Readonly(false);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Readonly.is}${testProp}`]).toEqual(false);
  });
})