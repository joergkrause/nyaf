import { Sortable } from './hint-sortable.decorator';
import { isFunction } from 'util';

test('Sortable decorator, set correct properties', () => {
  const dec = Sortable();
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const target = {};
  const decFunction = dec(target, 'test');
  expect(target['__isSortable__test']).toBeDefined();
  expect(target['__isSortable__test']).toBeTruthy();
});
