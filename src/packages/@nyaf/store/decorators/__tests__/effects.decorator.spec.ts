import { Effects } from '../effects.decorator';
import { isFunction } from '@nyaf/lib';
import { Effects_Symbol, Effects_Symbol_Ctor, CTOR } from '../../consts/decorator.props';

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
  expect(mockObj.prototype[Effects_Symbol]).toEqual(mockEffects);
  expect(mockObj.prototype[Effects_Symbol_Ctor]).toBeUndefined();
  expect(mockObj.prototype[CTOR]).not.toBeUndefined();
  expect(mockObj.prototype[CTOR]).toEqual([Effects_Symbol_Ctor]);
});
