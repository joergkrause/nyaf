import { ModelBinder } from '../modelbinder.class';
import { TestComponent } from './mocks/test.component';
import { MockModel } from './mocks/mock.model';
import { Required } from '../../decorators/forms/val-required.decorator';
import { Custom } from '../../decorators/forms/val-custom.decorator';

describe('modelbinder', () => {


  beforeEach(() => {

  });

  afterEach(() => {
    ModelBinder['_instanceStore'] = new Map();
    document.body.innerHTML = null;
  });

  it('get instance and initializes', () => {
    const initSpy = jest.spyOn(ModelBinder, 'initialize');
    customElements.define('test-binder', TestComponent);
    const testComponent = new TestComponent();
    document.body.appendChild(testComponent);
    const mb = ModelBinder.getInstance(testComponent);
    expect(mb).not.toBeUndefined();
    expect(initSpy).toBeCalledTimes(1);
  });

  it('has all handlers', () => {
    const testComponent = new TestComponent();
    document.body.appendChild(testComponent);
    const mb = ModelBinder.getInstance(testComponent);
    const handlers = mb.handlers;
    expect(Object.keys(handlers).length).toEqual(6);
  });

  // it('can handle custom handler', () => {
  //   const testComponent = new TestComponent();
  //   document.body.appendChild(testComponent);
  //   const mb = ModelBinder.getInstance(testComponent);
  //   const handlers = mb.handlers;
  //   expect(Object.keys(handlers).length).toEqual(6);
  // });

  it('create validation model', () => {
    const testComponent = new TestComponent();
    document.body.appendChild(testComponent);
    const mb = ModelBinder.getInstance(testComponent);
    const mockModel = new MockModel();
    ModelBinder['createValidationModel'](mockModel, mb, Required.internal, 'name');
    const mbStateResult = mb['state'];
    const expected = {
      "validators": {
        "name": {
          "error": {
            "required": "The field name is required."
          },
          "isValid": {
            "required": true
          },
          "type":
          {
            "required": true
          }
        }
      }
    };
    expect(mbStateResult).toEqual(expected);
  });

  it('create no validation model', () => {
    const testComponent = new TestComponent();
    document.body.appendChild(testComponent);
    const mb = ModelBinder.getInstance(testComponent);
    const mockModel = new MockModel();
    // this decorator is not set, hence no model
    ModelBinder['createValidationModel'](mockModel, mb, Custom.internal, 'name');
    const mbStateResult = mb['state'];
    const expected = {
      "validators": {
        "name": {
          "error": {},
          "isValid": {},
          "type": {},
        },
      },
    };
    expect(mbStateResult).toEqual(expected);
  });

});