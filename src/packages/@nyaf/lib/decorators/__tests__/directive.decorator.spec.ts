import { Directive } from '../directive.decorator';
import { isFunction } from 'util';
import { Directive_Symbol_Selector } from '../../consts/decorator.props';

test('Directive decorator', () => {
  const dec = Directive('[directive="test"]');
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  const mockObj: any = {};
  dec(mockObj);
  expect(mockObj[Directive_Symbol_Selector]).not.toBeUndefined();
  expect(mockObj[Directive_Symbol_Selector]).toEqual('[directive="test"]');
});
