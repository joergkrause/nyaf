import { GlobalProvider } from './globalprovider';

test('Static instance shall be provided', () => {
  expect(GlobalProvider).not.toBeNull();
});

