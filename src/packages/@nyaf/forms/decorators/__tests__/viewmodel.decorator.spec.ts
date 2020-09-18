import { ViewModel } from '../viewmodel.decorator';
import { isFunction } from 'util';

test('ViewModel signature', () => {
  expect(isFunction(ViewModel)).toBeTruthy();
});

test('ViewModel decorator', () => {

  class MockModel {
    constructor(constructorHelper: () => string) {
      this.name = constructorHelper();
    }
    name: string;
  }

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

  customElements.define('jest-test', MockComponent);

  const dec = ViewModel<MockModel>(MockModel);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
  expect(mockObj.__model__).not.toBeUndefined();
  expect(mockObj.__model__.name).toEqual('MockModel');
  expect(mockObj.prototype).not.toBeUndefined();
  expect(mockObj.prototype[Symbol.for('__ctor__')]).toMatchObject(['model']);
  expect(mockObj.prototype.model).not.toBeUndefined();
});
