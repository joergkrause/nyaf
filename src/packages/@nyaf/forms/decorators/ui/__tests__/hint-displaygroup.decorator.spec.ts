import { DisplayGroup } from '../hint-displaygroup.decorator';
import { isFunction } from '@nyaf/lib';

describe('DisplayGroup decorator', () => {
  it('text only', () => {
    const dec = DisplayGroup('Test Text');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${DisplayGroup.grouped}${testProp}`]).toEqual(true);
    expect(mockObj[`${DisplayGroup.group}${testProp}`]).toEqual('Test Text');
    expect(mockObj[`${DisplayGroup.order}${testProp}`]).toEqual(0);
    expect(mockObj[`${DisplayGroup.desc}${testProp}`]).toBeUndefined();
  });
  it('text and order', () => {
    const dec = DisplayGroup('Test Text', 1);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${DisplayGroup.grouped}${testProp}`]).toEqual(true);
    expect(mockObj[`${DisplayGroup.group}${testProp}`]).toEqual('Test Text');
    expect(mockObj[`${DisplayGroup.order}${testProp}`]).toEqual(1);
    expect(mockObj[`${DisplayGroup.desc}${testProp}`]).toBeUndefined();
  });
  it('text, order, description', () => {
    const dec = DisplayGroup('Test Text', 1, 'Test Description');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${DisplayGroup.grouped}${testProp}`]).toEqual(true);
    expect(mockObj[`${DisplayGroup.group}${testProp}`]).toEqual('Test Text');
    expect(mockObj[`${DisplayGroup.order}${testProp}`]).toEqual(1);
    expect(mockObj[`${DisplayGroup.desc}${testProp}`]).toEqual('Test Description');
  });
})