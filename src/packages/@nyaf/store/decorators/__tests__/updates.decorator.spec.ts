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
  const dec = Updates([{
    selector: '#id',
    store: 'value',
    target: 'innerText'
  }]);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
});
