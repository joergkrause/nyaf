import { Hidden } from '../hint-hidden.decorator';
import { isFunction } from 'util';

describe('Hidden decorator', () => {
  it('default', () => {
    const dec = Hidden();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Hidden.is}${testProp}`]).toEqual(true);
  });
  it('explicit true', () => {
    const dec = Hidden(true);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Hidden.is}${testProp}`]).toEqual(true);
  });
  it('explicit false', () => {
    const dec = Hidden(false);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Hidden.is}${testProp}`]).toEqual(false);
  });
})