import { bind } from '../bind.function';

class MockModel {
  name: string;
}

beforeAll(() => {
  jest.enableAutomock();
});

import { DefaultBindingHandler } from '../../modelbinder/handlers/defaultbindinghandler.class';

test('smart function "bind"', () => {
  const sourceProperty = 'name';
  const handler = DefaultBindingHandler;
  const result = bind<MockModel>(o => o.name, DefaultBindingHandler);
  expect(result).toEqual(`n-bind:${sourceProperty}:${handler ? handler.name : 'DefaultBindingHandler'}`)
})