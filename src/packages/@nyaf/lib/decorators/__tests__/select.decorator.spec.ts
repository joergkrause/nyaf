import { Select } from '../select.decorator';
import { isFunction } from 'util';
import { ShadowDOM_Symbol_WithShadow } from '../../consts/decorator.props';

test('Select decorator', () => {
  const dec = Select('div#test', false);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const divElement = document.createElement('div');
  const divElementToSelect = document.createElement('div');
  divElementToSelect.id = 'test';
  divElement.appendChild(divElementToSelect);
  const mockObj: any = divElement;
  dec.call(mockObj, mockObj, 'testProp');
  expect(mockObj['testProp']).not.toBeUndefined();
  expect(mockObj['testProp']).toMatchObject(divElement);
});

test('Select decorator withShadow', () => {
  const dec = Select('div#test', false);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const divElement = document.createElement('div');
  divElement.attachShadow({ mode: 'open' });
  const divElementToSelect = document.createElement('div');
  divElementToSelect.id = 'test';
  divElement.shadowRoot.appendChild(divElementToSelect);
  const mockObj: any = divElement;
  mockObj.constructor[ShadowDOM_Symbol_WithShadow] = true;
  dec.call(mockObj, mockObj, 'testProp');
  expect(mockObj['testProp']).not.toBeUndefined();
  expect(mockObj['testProp']).toMatchObject(divElement);
});

test('Select decorator with many', () => {
  const dec = Select('div.test', true);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const divElement = document.createElement('div');
  const first = document.createElement('div');
  const second = document.createElement('div');
  const divElementsToSelect = [
    first,
    second
  ];
  divElementsToSelect.forEach(divElementToSelect => {
    divElementToSelect.classList.add('test');
    divElement.appendChild(divElementToSelect);
  });
  const mockObj: any = divElement;
  delete mockObj.constructor[ShadowDOM_Symbol_WithShadow];
  dec.call(mockObj, mockObj, 'testProp');
  expect(mockObj['testProp']).not.toBeUndefined();
  expect(mockObj['testProp']).toMatchObject({
    length: 2,
    first: first,
    last: second,
    items: divElementsToSelect
  });
});

test('Select decorator with many and withShadow', () => {
  const dec = Select('div.test', true);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const divElement = document.createElement('div');
  divElement.attachShadow({ mode: 'open' });
  const first = document.createElement('div');
  const second = document.createElement('div');
  const third = document.createElement('div');
  const divElementsToSelect = [
    first,
    second
  ];
  divElementsToSelect.forEach(divElementToSelect => {
    divElementToSelect.classList.add('test');
    divElement.shadowRoot.appendChild(divElementToSelect);
  });
  divElement.shadowRoot.appendChild(third);
  const mockObj: any = divElement;
  mockObj.constructor[ShadowDOM_Symbol_WithShadow] = true;
  dec.call(mockObj, mockObj, 'testProp');
  expect(mockObj['testProp']).not.toBeUndefined();
  expect(mockObj['testProp']).toMatchObject({
    length: 2,
    first: first,
    last: second,
    items: divElementsToSelect
  });
});
