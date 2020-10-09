import { isPrimitive, isUndefined , uuidv4, isArray, isBoolean, isNull, isNullOrUndefined, isNumber, isString, isSymbol, isRegExp, isObject, isDate, isError, isFunction, from, select, of } from "../utils";

describe('util function collection', () => {

  it('uuidv4', () => {
    const u1 = uuidv4();
    const u2 = uuidv4();
    expect(u1).not.toEqual(u2);
  });

  it('isArray', () => {
    expect(isArray([])).toBeTruthy();
  });

  it('isBoolean', () => {
    expect(isBoolean(false)).toBeTruthy();
  });

  it('isNull', () => {
    expect(isNull(null)).toBeTruthy();
  });

  it('isNullOrUndefined', () => {
    expect(isNullOrUndefined(null)).toBeTruthy();
  });

  it('isNumber', () => {
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber(NaN)).toBeTruthy();
    expect(isNumber('')).toBeFalsy();
  });

  it('isString', () => {
    expect(isString('')).toBeTruthy();
    expect(isString(42)).toBeFalsy();
  });

  it('isSymbol', () => {
    expect(isSymbol(Symbol())).toBeTruthy();
  });

  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  it('isRegExp', () => {
    expect(isRegExp(/Test/i)).toBeTruthy();
  });

  it('isObject', () => {
    expect(isObject({})).toBeTruthy();
  });

  it('isDate', () => {
    expect(isDate(new Date())).toBeTruthy();
  });

  it('isError', () => {
    const err = new Error();
    expect(isError(err)).toBeTruthy();
  });

  it('isFunction', () => {
    function test(){}
    expect(isFunction(test)).toBeTruthy();
  });

  it('isPrimitive', () => {
    expect(isPrimitive(null)).toBeTruthy();
    expect(isPrimitive('boolean')).toBeTruthy();
    expect(isPrimitive('number')).toBeTruthy();
    expect(isPrimitive('string')).toBeTruthy();
    expect(isPrimitive('symbol')).toBeTruthy();
    expect(isPrimitive('undefined')).toBeTruthy();
  });

  describe('function of', () => {
    it('simple', () => {
      function test() { }
      const result = `@@${test.name}@@`;
      expect(result).toEqual('@@test@@');
    });

    it('class', () => {
      class MockOf {
        name: string = '';
      }
      const result = of<MockOf>(o => o.name);
      expect(result).toEqual('@@name@@');
    });

    it('class', () => {
      class MockOf {
        name: string = '';
      }
      const result = of<MockOf>(MockOf);
      expect(result).toEqual('@@MockOf@@');
    });
  });

  it('from', () => {
    const data = [];
    expect(from(data)).toMatch('[]');
  });

  it('select', () => {
    class MockModel {
      name: string = 'test';
    }
    expect(select<MockModel>((d) => d.name)).toMatch('@@name@@');
  });

});
