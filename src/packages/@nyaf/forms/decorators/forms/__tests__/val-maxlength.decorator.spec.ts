import { MaxLength } from '../val-maxlength.decorator';
import { isFunction } from '@nyaf/lib';

describe('MaxLength decorator', () => {
  it('default', () => {
    const dec = MaxLength(42);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@email.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${MaxLength.internal}__${testProp}`]).toEqual(true);
    const expectMsg = `The field ${testProp} has max length of 42 characters.`;
    expect(mockObj[`__err__${MaxLength.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${MaxLength.internal}__${testProp}`]).toEqual(true);
  });
  it('custom message', () => {
    const dec = MaxLength(42, 'An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@email.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${MaxLength.internal}__${testProp}`]).toEqual(true);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${MaxLength.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${MaxLength.internal}__${testProp}`]).toEqual(true);
  });
  it('error detected', () => {
    const dec = MaxLength(42);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'This text has definitely more than 42 characters this test function allows.'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${MaxLength.internal}__${testProp}`]).toEqual(true);
    const expectMsg = `The field ${testProp} has max length of 42 characters.`;
    expect(mockObj[`__err__${MaxLength.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${MaxLength.internal}__${testProp}`]).toEqual(false);
  });
});
