import { Required } from '../val-required.decorator';
import { isFunction } from '@nyaf/lib';

describe('Required decorator', () => {
  it('default', () => {
    const dec = Required();
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const testProp = 'testProp';
    const mockObj: any = {
      [testProp]: 'someValue'
    };
    dec(mockObj, testProp);
    expect(mockObj[`__has__${Required.internal}__${testProp}`]).toEqual(true);
    const expectMsg = `The field ${testProp} is required.`;
    expect(mockObj[`__err__${Required.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Required.internal}__${testProp}`]).toEqual(true);
  });

});
