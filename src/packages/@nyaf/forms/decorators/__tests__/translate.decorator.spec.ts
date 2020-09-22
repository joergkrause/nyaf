import { Translate } from '../translate.decorator';
import { isFunction } from '@nyaf/lib';

class MockModel {
  constructor() {
    this.name = '';
  }
  name: string;
}

test('Translate signature', () => {
  const dec = Translate({ 'test': 'text' });
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = new MockModel();
  dec(mockObj);
});
