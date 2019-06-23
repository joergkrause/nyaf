import { Observer } from './observer.service';

test('can get Observer instance', () => {
  const os = new Observer();
  expect(os.events).not.toBeNull();
});


