import { Display } from '../hint-display.decorator';
import { isFunction } from 'util';

describe('Display decorator', () => {
  it('text only', () => {
    const dec = Display('Test Text');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Display.text}${testProp}`]).toEqual('Test Text');
    expect(mockObj[`${Display.order}${testProp}`]).toEqual(0);
    expect(mockObj[`${Display.desc}${testProp}`]).toBeUndefined();
  });
  it('text and order', () => {
    const dec = Display('Test Text', 1);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Display.text}${testProp}`]).toEqual('Test Text');
    expect(mockObj[`${Display.order}${testProp}`]).toEqual(1);
    expect(mockObj[`${Display.desc}${testProp}`]).toBeUndefined();
  });
  it('text, order, description', () => {
    const dec = Display('Test Text', 1, 'Test Description');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${Display.text}${testProp}`]).toEqual('Test Text');
    expect(mockObj[`${Display.order}${testProp}`]).toEqual(1);
    expect(mockObj[`${Display.desc}${testProp}`]).toEqual('Test Description');
  });
})