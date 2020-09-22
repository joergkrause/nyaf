import { Pattern } from '../val-pattern.decorator';
import { isFunction } from '@nyaf/lib';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

describe('Pattern decorator', () => {
  it('default', () => {
    const dec = Pattern(pattern);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@Pattern.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Pattern.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__pattern__${Pattern.internal}__${testProp}`]).toEqual(pattern);
    const expectMsg = `The field ${testProp} must fullfill the pattern ${pattern}.`;
    expect(mockObj[`__err__${Pattern.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Pattern.internal}__${testProp}`]).toEqual(true);
  });
  it('custom message', () => {
    const dec = Pattern(pattern, 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@Pattern.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Pattern.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__pattern__${Pattern.internal}__${testProp}`]).toEqual(pattern);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Pattern.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Pattern.internal}__${testProp}`]).toEqual(true);
  });
  it('error detected', () => {
    const dec = Pattern(pattern);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'validPattern.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Pattern.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__pattern__${Pattern.internal}__${testProp}`]).toEqual(pattern);
    const expectMsg = `The field ${testProp} must fullfill the pattern ${pattern}.`;
    expect(mockObj[`__err__${Pattern.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Pattern.internal}__${testProp}`]).toEqual(false);
  });
});
