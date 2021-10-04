import { ModelBinder } from '../modelbinder.class';
import { ValidatorBinding } from '../validatorbinding.class';
import { TestComponent } from './mocks/test.component';
import { MockModel } from './mocks/mock.model';
import { DefaultBindingHandler } from '../handlers/defaultbindinghandler.class';

describe('validatorbinding', () => {


  beforeAll(() => {
    customElements.define('test-component', TestComponent);
  });

  afterEach(() => {
    ModelBinder['_instanceStore'] = new Map();
    document.body.innerHTML = null;
  });

  it('get instance and initializes', () => {
    const tc = new TestComponent();
    document.body.appendChild(tc);
    ModelBinder.initialize(tc);
    const mb = ModelBinder.getInstance(tc);
    expect(mb.handlers).not.toBeUndefined();
    const input = document.querySelector('input');
    const vn = new ValidatorBinding('name', DefaultBindingHandler.name, mb, 'required', input);
    expect(vn['handler']).toEqual('DefaultBindingHandler');
    expect(vn['modelProperty']).toEqual('name');
    expect(vn['validatorKey']).toEqual('required');
    expect(vn['validationHandler']).toEqual({});
  });


});