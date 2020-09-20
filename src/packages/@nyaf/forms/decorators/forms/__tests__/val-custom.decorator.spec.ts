import { Custom } from '../val-custom.decorator';
import { isFunction } from 'util';

describe('Custom decorator', () => {
  it('default', () => {
    const dec = Custom(() => { return true; });
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@email.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Custom.internal}__${testProp}`]).toEqual(true);
    const expectMsg = `The field ${testProp} is not valid.`;
    expect(mockObj[`__err__${Custom.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Custom.internal}__${testProp}`]).toEqual(true);
  });
  it('custom message', () => {
    const dec = Custom(() => { return true; }, 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: ''
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Custom.internal}__${testProp}`]).toEqual(true);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Custom.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Custom.internal}__${testProp}`]).toEqual(true);
  });
  it('object property correct', () => {
    const dec = Custom(() => { return this['testProp'] === 123; }, 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 123
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Custom.internal}__${testProp}`]).toEqual(true);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Custom.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Custom.internal}__${testProp}`]).toEqual(true);
  });
  it('object property wrong', () => {
    const dec = Custom(() => { return this['testProp'] === 123; }, 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 456
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Custom.internal}__${testProp}`]).toEqual(true);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Custom.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Custom.internal}__${testProp}`]).toEqual(false);
  });
});
