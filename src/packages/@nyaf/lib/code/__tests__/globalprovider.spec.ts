import { GlobalProvider } from '../globalprovider';
import { JSDOM } from 'jsdom';
import { IComponent } from '../../types/common';
import { BaseComponent } from '../../components/base.component';
import { CustomElement_Symbol_Selector, Events_Symbol_Eventlist } from '../../consts/decorator.props';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

beforeAll(() => {
  const dom = new JSDOM();
  global.document = dom.window.document;
  global.window = dom.window;
});

beforeEach(() => {
});

afterEach(() => {
  // mockDateNow.mockRestore();
});

describe('GlobalProvider', () => {

  it('has a static instance provided', () => {
    expect(GlobalProvider).not.toBeNull();
    expect(GlobalProvider.routerAction).not.toBeNull();
    expect(GlobalProvider.navigateRoute).not.toBeNull();
  });

  it('registers a component', () => {

    class MockComponent extends BaseComponent<{}>{
      constructor() {
        super();
      }
      async render() {
        return '';
      }
    }

    const componentMock = MockComponent as IComponent;
    // make writeable to simulate the decorator
    (componentMock as Writeable<IComponent>)[CustomElement_Symbol_Selector] = 'mock-component';
    GlobalProvider.register(componentMock);
    const registered = GlobalProvider.registeredElements;
    expect(registered).toEqual(['MOCK-COMPONENT']);
  });

  it('registers and receive an event', () => {

    class MockEventComponent extends BaseComponent<{}>{
      constructor() {
        super();
      }
      async render() {
        return '';
      }
    }

    const componentMock = MockEventComponent as IComponent;
    // make writeable to simulate the decorator
    (componentMock as Writeable<IComponent>)[CustomElement_Symbol_Selector] = 'mock-component-event';
    (componentMock as Writeable<IComponent>)[Events_Symbol_Eventlist] = ['testAction'];
    GlobalProvider.registeredElements = [];
    const eventSpyDoc = jest.spyOn(GlobalProvider as any, 'eventHub');
    GlobalProvider.register(componentMock);
    document.dispatchEvent(new Event('testAction'));
    expect(eventSpyDoc).toHaveBeenCalledTimes(1);
  });

});
