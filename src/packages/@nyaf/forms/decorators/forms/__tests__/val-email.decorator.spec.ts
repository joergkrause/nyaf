import { Email } from '../val-email.decorator';
import { isFunction } from '@nyaf/lib';

const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

describe('Email decorator', () => {
  it('default', () => {
    const dec = Email();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@email.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Email.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__pattern__${Email.internal}__${testProp}`]).toEqual(pattern);
    const expectMsg = `The field ${testProp} must contain a valid e-mail address.`;
    expect(mockObj[`__err__${Email.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Email.internal}__${testProp}`]).toEqual(true);
  });
  it('custom message', () => {
    const dec = Email('An error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'valid@email.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Email.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__pattern__${Email.internal}__${testProp}`]).toEqual(pattern);
    const expectMsg = 'An error occurred';
    expect(mockObj[`__err__${Email.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Email.internal}__${testProp}`]).toEqual(true);
  });
  it('error detected', () => {
    const dec = Email();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'validemail.com'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Email.internal}__${testProp}`]).toEqual(true);
    expect(mockObj[`__pattern__${Email.internal}__${testProp}`]).toEqual(pattern);
    const expectMsg = `The field ${testProp} must contain a valid e-mail address.`;
    expect(mockObj[`__err__${Email.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Email.internal}__${testProp}`]).toEqual(false);
  });
});
