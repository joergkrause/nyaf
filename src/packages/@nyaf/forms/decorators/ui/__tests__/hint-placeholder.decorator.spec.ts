import { Placeholder } from '../hint-placeholder.decorator';
import { isFunction } from '@nyaf/lib';

describe('Placeholder decorator', () => {
  it('set a name', () => {
    const dec = Placeholder('Some Placeholder');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Placeholder.has}${testProp}`]).toEqual(true);
    expect(mockObj[`${Placeholder.text}${testProp}`]).toEqual('Some Placeholder');
  });
})