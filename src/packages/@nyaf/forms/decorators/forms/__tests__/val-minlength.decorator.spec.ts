import { MinLength } from '../val-minlength.decorator';
import { isFunction } from '@nyaf/lib';

describe('MinLength decorator', () => {
  it('default', () => {
    const dec = MinLength(12);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'Yes, this is enough'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${MinLength.internal}__${testProp}`]).toEqual(true);
    const expectMsg = `The field ${testProp} needs at least 12 characters.`;
    expect(mockObj[`__err__${MinLength.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${MinLength.internal}__${testProp}`]).toEqual(true);
  });
  it('custom message', () => {
    const dec = MinLength(12, 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'Yes, this is enough'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${MinLength.internal}__${testProp}`]).toEqual(true);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${MinLength.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${MinLength.internal}__${testProp}`]).toEqual(true);
  });
  it('error detected', () => {
    const dec = MinLength(12);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'Not enough.'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${MinLength.internal}__${testProp}`]).toEqual(true);
    const expectMsg = `The field ${testProp} needs at least 12 characters.`;
    expect(mockObj[`__err__${MinLength.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${MinLength.internal}__${testProp}`]).toEqual(false);
  });
});
