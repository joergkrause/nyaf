import { val } from '../val.function';

class MockModel {
  name: string;
}

beforeAll(() => {
  jest.enableAutomock();
});

import { DefaultBindingHandler } from '../../modelbinder/handlers/defaultbindinghandler.class';
import { Required } from '../../decorators/forms/val-required.decorator';

describe('smart function "val"', () => {
  it('without handler', () => {
    const result = val<MockModel>(o => o.name, Required);
    expect(result).toEqual(`n-val:name:${Required.internal}`);
  });

  it('with handler', () => {
    const handler = DefaultBindingHandler;
    const result = val<MockModel>(o => o.name, Required, handler);
    expect(result).toEqual(`n-val:name:${Required.internal}:DefaultBindingHandler`);
  });
});
