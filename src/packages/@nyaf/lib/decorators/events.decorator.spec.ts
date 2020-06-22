import { Events } from './events.decorator';
import { isFunction } from 'util';

test('Events decorator, not matching target', () => {
  const dec = Events(['mockEvent']);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj.customEvents).not.toBeUndefined();
  expect(mockObj.customEvents).toMatchObject(['mockEvent_undefined']);
});
