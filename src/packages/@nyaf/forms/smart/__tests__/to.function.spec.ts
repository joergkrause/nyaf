import { to } from '../to.function';

class MockModel {
  name: string;
}

beforeAll(() => {
  jest.enableAutomock();
});

import { DefaultBindingHandler } from '../../modelbinder/handlers/defaultbindinghandler.class';

test('smart function "to"', () => {
  const targetProp = 'innerHTML';
  const handler = DefaultBindingHandler;
  const result = to<MockModel>(o => o.name, h => h.innerHTML);
  expect(result).toEqual(`${targetProp}:name`)
});
