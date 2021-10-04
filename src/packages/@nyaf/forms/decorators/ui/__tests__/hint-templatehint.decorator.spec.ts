import { TemplateHint } from '../hint-templatehint.decorator';
import { isFunction } from '@nyaf/lib';

describe('TemplateHint decorator', () => {
  it('no params', () => {
    const dec = TemplateHint('TemplateName');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${TemplateHint.has}${testProp}`]).toEqual(true);
    expect(mockObj[`${TemplateHint.hint}${testProp}`]).toEqual('TemplateName');
    expect(mockObj[`${TemplateHint.params}${testProp}`]).toBeUndefined();
  });
  it('with params', () => {
    const dec = TemplateHint('TemplateName', { 'width': '200px' });
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    const mockObj: any = {};
    const testProp = 'testProp';
    dec(mockObj, testProp);
    expect(mockObj[`${TemplateHint.has}${testProp}`]).toEqual(true);
    expect(mockObj[`${TemplateHint.hint}${testProp}`]).toEqual('TemplateName');
    expect(mockObj[`${TemplateHint.params}${testProp}`]).toMatchObject({ 'width': '200px' });
  });
})