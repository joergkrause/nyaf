import { Events } from '../events.decorator';
import { isFunction } from '../../code/utils';
import { Events_Symbol_Eventlist } from '../../consts/decorator.props';

test('Events decorator, not matching target', () => {
  const dec = Events(['mockEvent']);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[Events_Symbol_Eventlist]).not.toBeUndefined();
  expect(mockObj[Events_Symbol_Eventlist]).toMatchObject(['mockEvent_undefined']);
});
