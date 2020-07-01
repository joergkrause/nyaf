import { GlobalProvider } from './globalprovider';

import { MockComponent } from './mocks/mock.component';
import { Component } from '../types/common';

beforeEach(() => {
  // mockDateNow = jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(now).getTime());
});

afterEach(() => {
  // mockDateNow.mockRestore();
});

test('Static instance shall be provided', () => {
  expect(GlobalProvider).not.toBeNull();
  expect(GlobalProvider.routerAction).not.toBeNull();
  expect(GlobalProvider.navigateRoute).not.toBeNull();
});

test('register function', () => {
  const eventSpyDoc = jest.spyOn(document, 'addEventListener');
  const componentMock = MockComponent as Component;
  GlobalProvider.register(componentMock);
  const registered = GlobalProvider.registeredElements;
  expect(registered).toEqual(['MOCK-COMPONENT']);
  expect(eventSpyDoc).toHaveBeenCalledTimes(1);
  // execute event call
  const eventSpyHub = jest.spyOn(GlobalProvider as any, 'eventHub');
  const mockEvent = new Event('showAlert');
  document.dispatchEvent(mockEvent);
  expect(eventSpyHub).toHaveBeenCalledTimes(0); // TODO: Not correct
});




