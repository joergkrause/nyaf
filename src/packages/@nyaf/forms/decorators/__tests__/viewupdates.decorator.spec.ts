import { ViewUpdates } from '../viewupdates.decorator';
import { isFunction } from '@nyaf/lib';
import { ViewUpdate } from '../../interfaces/viewupdate.interface';
import { BaseComponent } from '@nyaf/lib';

test('ViewUpdates signature', () => {
  expect(isFunction(ViewUpdates)).toBeTruthy();
});

describe('ViewUpdates decorator', () => {

  class MockModel {
    constructor(constructorHelper: () => string) {
      this.name = constructorHelper();
    }
    name: string;
  }


  class MockComponent extends BaseComponent<{}> {
    constructor() {
      super();
    }
    async render() {
      return '<div id="target"></div>';
    }
  }

  customElements.define('jest-test', MockComponent);

  const updateMap: ViewUpdate<MockModel, MockComponent>[] = [
    {
    property: 'name',
    selector: '#target',
    target: 'innerText'
    }
  ];

  const dec = ViewUpdates<MockModel>(updateMap);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = new MockComponent();
  dec(mockObj);
  const targetPrototype = Object.getPrototypeOf(mockObj);
  expect(targetPrototype).not.toBeUndefined();
  expect(targetPrototype[Symbol.for('__ctor__')]).toBeInstanceOf(Array);
  // binder intializer returns nothing
  expect(targetPrototype[Symbol.for('__viewupdates_ctor__')]).toBeUndefined();
  expect(targetPrototype[Symbol.for('__viewupdates__')]).toEqual(updateMap);
});
