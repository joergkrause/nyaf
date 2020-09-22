import { ProvideStore } from '../providestore.decorator';
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

test('ProvideStore decorator', () => {
  const dec = ProvideStore(null);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
});
