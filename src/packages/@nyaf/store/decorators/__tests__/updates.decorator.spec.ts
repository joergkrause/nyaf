import { Updates } from '../updates.decorator';
import { isFunction } from '@nyaf/lib';

class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }
}

class MockComponent extends BaseComponent {
  constructor() {
    super();
  }
}

test('Updates decorator', () => {
  const mockUpdates = [{
    selector: '#id',
    store: 'value',
    target: 'innerText'
  }];
  const dec = Updates(mockUpdates);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
  expect(mockObj.prototype['__updates__']).toEqual(mockUpdates);
  expect(mockObj.prototype['__updates_ctor__']).toBeUndefined();
  expect(mockObj.prototype[Symbol.for('__ctor__')]).not.toBeUndefined();
  expect(mockObj.prototype[Symbol.for('__ctor__')]).toEqual(['__updates_ctor__']);
});
