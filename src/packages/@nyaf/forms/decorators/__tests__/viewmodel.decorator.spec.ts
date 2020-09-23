import { ViewModel } from '../viewmodel.decorator';
import { isFunction } from '@nyaf/lib';
import { ModelBinder } from '../..';
import { MockComponent } from './mocks/mock.component';
import { MockOptionsCtorComponent, MockOptionsFactoryComponent, MockBindingHandler } from './mocks/mockoptions.component';
import { MockModel } from './mocks/mock.model';

beforeAll(() => {
  // create and assign to invoke ctor code
  customElements.define('jest-test', MockComponent);
  customElements.define('jest-test-options-ctor', MockOptionsCtorComponent);
  customElements.define('jest-test-options-factory', MockOptionsFactoryComponent);
  document.body.innerHTML = `
    <jest-test></jest-test>
    <jest-test-options-ctor></jest-test-options-ctor>
    <jest-test-options-factory></jest-test-options-factory>
    `;
});

describe('Viewmodel decorator', () => {

  it('is a function', () => {
    expect(isFunction(ViewModel)).toBeTruthy();
  });

  let mockObj: any;

  it('can setup a model', () => {
    mockObj = document.querySelector('jest-test');
    // public parts are on the instance level (each is different)
    expect(mockObj.__uniqueId__).not.toBeUndefined();
    expect(mockObj[Symbol.for('__ctor__')]).toMatchObject(['model']);
    // internal props are set static (on the ctor, each is the same)
    expect(mockObj.constructor.__model__).not.toBeUndefined();
    expect(mockObj.constructor.__model__.name).toEqual('MockModel');
  });

  it('sets the model binder', () => {
    expect(mockObj.model).not.toBeUndefined();
    expect(mockObj.model).toBeInstanceOf(ModelBinder);
  })

  it('can setup a model with options ctor', () => {
    mockObj = document.querySelector('jest-test-options-ctor');
    // public parts are on the instance level (each is different)
    expect(mockObj.__uniqueId__).not.toBeUndefined();
    expect(mockObj[Symbol.for('__ctor__')]).toMatchObject(['model']);
    // internal props are set static (on the ctor, each is the same)
    expect(mockObj.constructor.__model__).not.toBeUndefined();
    expect(mockObj.constructor.__model__.name).toEqual('MockModel');
    // special for ctor
    expect(mockObj.constructor.__model__ctor__).not.toBeUndefined();
    expect(mockObj.constructor.__model__ctor__).toEqual({ name: 'standard name' });
    expect(Object.keys((mockObj.model as ModelBinder<MockModel>).handlers).length).toEqual(7);
  });

  it('can setup a model with options handler', () => {
    mockObj = document.querySelector('jest-test-options-ctor');
    // public parts are on the instance level (each is different)
    expect(mockObj.__uniqueId__).not.toBeUndefined();
    expect(mockObj[Symbol.for('__ctor__')]).toMatchObject(['model']);
    // internal props are set static (on the ctor, each is the same)
    expect(mockObj.model).not.toBeUndefined();
    expect(mockObj.model).toBeInstanceOf(ModelBinder);
  });

  it('can setup a model with options factory', () => {
    mockObj = document.querySelector('jest-test-options-factory');
    // public parts are on the instance level (each is different)
    expect(mockObj.__uniqueId__).not.toBeUndefined();
    expect(mockObj[Symbol.for('__ctor__')]).toMatchObject(['model']);
    // internal props are set static (on the ctor, each is the same)
    expect(mockObj.constructor.__model__factory__).not.toBeUndefined();
    const expected = (model) => model.name = 'default name';
    expect(mockObj.constructor.__model__factory__).toEqual(expect.any(Function));
    const m = new MockModel();
    const received = mockObj.constructor.__model__factory__(m);
    expect(received).toEqual('default name');
  });

});
