import events from '../events';

test('number of monitored events', () => {
  expect(Array.isArray(events)).toBeTruthy();
  expect((events as []).length).toEqual(85);
})