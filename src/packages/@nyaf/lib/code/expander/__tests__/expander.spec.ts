import { Expander } from '../expander';

class MockExpander extends Expander {
  test: string = '';
  demo: string = 'parameter';
}

test('Expander Attribute', () => {
  const expander = new MockExpander();
  const result = expander.expand();
  expect(result).toEqual('test="" demo="parameter"');
});
