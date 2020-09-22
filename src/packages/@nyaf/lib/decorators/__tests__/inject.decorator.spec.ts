import { Inject } from '../inject.decorator';
import { isFunction } from '../../code/utils';
import { InjectServices_Symbol } from '../../consts/decorator.props';
import { ServiceType } from '../../types/servicetype';

afterEach(() => {
  jest.clearAllMocks();
});

class MockService {
  constructor() { }
}

class MockSingletonService {

  private static _instance: ServiceType<MockSingletonService>;
  public static get get(): ServiceType<MockSingletonService> {
    if (!MockSingletonService._instance) {
      MockSingletonService._instance = {} as any;
      MockSingletonService._instance.instance = new MockSingletonService();
    }
    return MockSingletonService._instance;
  }
}

describe('Inject decorator instance', () => {
  const dec = Inject(MockService);
  it('is defined', () => {
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
  });
  it('sets the services property', () => {
    function mockClass() { }
    dec(mockClass, 'service');
    expect(mockClass['service']).not.toBeUndefined();
    // test creation of internal service Map
    const testMap = new Map<string, any>();
    // decorator creates an instance if not singleton
    testMap.set('MockService', new MockService());
    expect(mockClass['service']).toMatchObject(testMap);
  });
});


test('Inject decorator singleton', () => {
  const dec = Inject(MockSingletonService.get, true);
  expect(dec).not.toBeUndefined();
  expect(isFunction(dec)).toBeTruthy();
  function mockClass() { }
  dec(mockClass, 'service');
  expect(mockClass.prototype[InjectServices_Symbol]).not.toBeUndefined();
  // test creation of internal service Map
  const testMap = new Map<string, any>();
  // decorator creates an instance if it's a singleton
  testMap.set('MockSingletonService', MockSingletonService.get.instance);
  expect(mockClass['service']).toMatchObject(testMap);
});

test('Inject decorator internals', () => {
  const dec = Inject(MockService);
  function mockClassForSpy() { }
  const spy = jest.spyOn(Object, 'defineProperty');
  dec(mockClassForSpy, 'service');
  dec(mockClassForSpy, 'service');
  dec(mockClassForSpy, 'service');
  // multiple calls result in a single setting
  expect(spy).toBeCalledTimes(1);
});

// TODO: recognition of different service types

