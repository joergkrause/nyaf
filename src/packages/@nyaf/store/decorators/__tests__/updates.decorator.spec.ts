import { Updates } from '../updates.decorator';
import { isFunction } from '@nyaf/lib';
import { CTOR } from '@nyaf/lib/consts/decorator.props';
import { Updates_Symbol, Updates_Symbol_Ctor } from '../../consts/decorator.props';

class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }
}

class MockComponent extends BaseComponent {
  constructor() {
    super();
  }
}

test('Updates decorator', () => {
  const mockUpdates = [{
    selector: '#id',
    store: 'value',
    target: 'innerText'
  }];
  const dec = Updates(mockUpdates);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = Object.create(MockComponent);
  dec(mockObj);
  expect(mockObj.prototype[Updates_Symbol]).toEqual(mockUpdates);
  expect(mockObj.prototype[Updates_Symbol_Ctor]).toBeUndefined();
  expect(mockObj.prototype[CTOR]).not.toBeUndefined();
  expect(mockObj.prototype[CTOR]).toEqual([Updates_Symbol_Ctor]);
});
