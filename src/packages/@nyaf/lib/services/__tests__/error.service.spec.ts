import { ErrorHandler } from "../error.service";

describe('ErrorHandler service', () => {

  const mockederror = () => { };
  const originalError = console.error;

  beforeEach(() => (console.error = mockederror));
  afterEach(() => (console.error = originalError));

  it('has function', () => {
    const eh = ErrorHandler.Throw;
    expect(eh).not.toBeNull();
  });

  it('throws error', () => {
    const error = () => {
      ErrorHandler.Throw('Test', true);
    };
    expect(error).toThrowError(Error);
  });

  it('throws error with default parameter', () => {
    const error = () => {
      ErrorHandler.Throw('Test');
    };
    expect(error).toThrowError(Error);
  });

  it('not writes error', () => {
    const spy = jest.spyOn(console, 'error');
    const error = () => {
      ErrorHandler.Throw('Test', false);
    };
    expect(error).toThrowError(Error);
    expect(spy).toBeCalledTimes(0);
  });

  it('writes error', () => {
    const spy = jest.spyOn(console, 'error');
    const error = () => {
      ErrorHandler.Throw('Test', true);
    };
    expect(error).toThrowError(Error);
    expect(spy).toBeCalledTimes(1);
  });

  it('returns url error text', () => {
    const spy = jest.spyOn(console, 'error');
    const error = () => {
      ErrorHandler.Throw('Test', true);
    };
    expect(error).toThrowError(Error);
    expect(error).toThrow('https://nyaf.comzept.de/be/err/Test');
  });

  it('writes error text', () => {
    console.error = jest.fn();
    const error = () => {
      ErrorHandler.Throw('Test', true);
    };
    expect(error).toThrowError(Error);
    expect(console.error['mock'].calls[0][0]).toBe('An internal error occured (Test)');
  });
  // An internal error occured (Test)

  // const text = 'An internal error occured (' + err + ')';
  // const url = 'https://nyaf.comzept.de/be/err/' + err;
  // con ? console.error(text) : void 0;
  // throw new Error(url);


});
