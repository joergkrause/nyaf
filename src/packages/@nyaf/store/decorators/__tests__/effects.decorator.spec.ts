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
  const dec = Effects([
    {
      action: 'INC',
      selector: '#id',
      trigger: 'click',
      parameter: null
    }
  ]);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
});
