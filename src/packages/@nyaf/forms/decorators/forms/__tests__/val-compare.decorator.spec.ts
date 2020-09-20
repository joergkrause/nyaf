import { Compare } from '../val-compare.decorator';
import { isFunction } from 'util';

describe('Compare decorator', () => {
  it('default', () => {
    const dec = Compare('otherProp');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const withProp = 'otherProp';
    const mockObj: any = {
      [withProp]: 'valueToCompare',
      [testProp]: 'valueToCompare'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Compare.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__with__${Compare.internal}__${testProp}`]).toEqual(withProp);
    const expectMsg = `The field ${testProp} must have the same value as field ${withProp}.`;
    expect(mockObj[`__err__${Compare.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Compare.internal}__${testProp}`]).toEqual(true);
  });
  it('custom message', () => {
    const dec = Compare('otherProp', 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const withProp = 'otherProp';
    const mockObj: any = {
      [withProp]: 'valueToCompare',
      [testProp]: 'valueToCompare'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Compare.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__with__${Compare.internal}__${testProp}`]).toEqual(withProp);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Compare.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Compare.internal}__${testProp}`]).toEqual(true);
  });
  it('error detected second', () => {
    const dec = Compare('otherProp', 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const withProp = 'otherProp';
    const mockObj: any = {
      [withProp]: 'valueToCompareIsWrong',
      [testProp]: 'valueToCompare'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Compare.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__with__${Compare.internal}__${testProp}`]).toEqual(withProp);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Compare.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Compare.internal}__${testProp}`]).toEqual(false);
  });
  it('error detected first', () => {
    const dec = Compare('otherProp', 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const withProp = 'otherProp';
    const mockObj: any = {
      [withProp]: 'valueToCompare',
      [testProp]: 'valueToCompareIsWrong'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Compare.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__with__${Compare.internal}__${testProp}`]).toEqual(withProp);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Compare.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Compare.internal}__${testProp}`]).toEqual(false);
  });
})