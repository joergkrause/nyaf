import { Effects } from '../effects.decorator';
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

test('Effects decorator', () => {
  const mockEffects = [
    {
      action: 'INC',
      selector: '#id',
      trigger: 'click',
      parameter: null
    }
  ];
  const dec = Effects(mockEffects);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
  expect(mockObj.prototype['__effects__']).toEqual(mockEffects);
  expect(mockObj.prototype['__effects__ctor__']).toBeUndefined();
  expect(mockObj.prototype[Symbol.for('__ctor__')]).not.toBeUndefined();
  expect(mockObj.prototype[Symbol.for('__ctor__')]).toEqual(['__effects_ctor__']);
});
