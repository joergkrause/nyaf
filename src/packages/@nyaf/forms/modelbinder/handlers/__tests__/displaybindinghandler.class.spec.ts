import { Binding } from '../../binding.class';
import { IBindingHandler } from '../ibindinghandler.interface';
import { BindName } from '../../decorators/bindname.decorator';
import { DisplayBindingHandler } from '../displaybindinghandler.class';

test('DisplayBindingHandler', () => {
  const handler = new DisplayBindingHandler();
  expect(handler.constructor[Symbol.for('bindingname')]).toEqual('DisplayBindingHandler');
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

