import { Binding } from '../../binding.class';
import { IBindingHandler } from '../ibindinghandler.interface';
import { BindName } from '../../decorators/bindname.decorator';
import { TextBindingHandler } from '../textbindinghandler.class';

test('DefaultBindingHandler', () => {
  const handler = new TextBindingHandler();
  expect(handler.constructor[Symbol.for('bindingname')]).toEqual('TextBindingHandler');
  const reactSpy = jest.spyOn(handler, 'react');
  const el = document.createElement('div');
  const binder = class MockBinding extends Binding {
    constructor(
      public el: HTMLElement,
      public value: string,
      public bind: (prop?) => void,
      public binderInstance: any,
      public handler: any
    ) {
      super('name', handler, binderInstance, el);
    }
  };
  handler.react(new binder(el, 'test', () => { }, { scope: [] }, null));
  expect(reactSpy).toHaveBeenCalled();
  expect(reactSpy).toHaveBeenCalledTimes(1);
});

