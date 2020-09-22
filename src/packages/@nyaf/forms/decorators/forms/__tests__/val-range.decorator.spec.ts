import { Range } from '../val-range.decorator';
import { isFunction } from '@nyaf/lib';

describe('Range decorator (numbers)', () => {

  let mockObj = {};
  const testProp = 'testProp';
  const from = 1;
  const to = 100;

  beforeEach(() => {
    const dec = Range(from, to);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    mockObj = {
      [testProp]: 2
    };
    dec(mockObj, testProp);
  })

  it('with number within', () => {
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with number lower edge', () => {
    mockObj[testProp] = 1;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with number upper edge', () => {
    mockObj[testProp] = 100;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with number lower edge', () => {
    mockObj[testProp] = 1;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });

});


describe('Range decorator (Date)', () => {

  let mockObj = {};
  const testProp = 'testProp';
  const from = new Date(2020, 10, 3, 15, 30, 0);
  const to = new Date(2020, 10, 4, 15, 30, 0);

  beforeEach(() => {
    const dec = Range(from, to);
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    mockObj = {
      [testProp]: new Date(2020, 10, 4, 10, 0, 0)
    };
    dec(mockObj, testProp);
  })

  it('with Date within', () => {
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with Date lower edge', () => {
    mockObj[testProp] = new Date(2020, 10, 3, 15, 30, 0);
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with Date upper edge', () => {
    mockObj[testProp] = new Date(2020, 10, 4, 15, 30, 0);
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with Date false one second', () => {
    mockObj[testProp] = new Date(2020, 10, 4, 15, 30, 1);
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(false);
  });
  it('with Date false one minute', () => {
    mockObj[testProp] = new Date(2020, 10, 4, 15, 31, 0);
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(false);
  });
  it('with Date false one hour', () => {
    mockObj[testProp] = new Date(2020, 10, 4, 16, 30, 0);
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(false);
  });
  it('with Date wrong type', () => {
    mockObj[testProp] = '';
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(false);
  });
  it('with wrong from', () => {
    const wrongFromType = 321;
    mockObj[testProp] = wrongFromType;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = `The field ${testProp} does not fall into the range from ${from} to ${to}.`;
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(false);
  });

});


describe('Range decorator (custom message)', () => {

  let mockObj = {};
  const testProp = 'testProp';
  const from = 1;
  const to = 100;

  beforeEach(() => {
    const dec = Range(from, to, 'A range error occurred');
    expect(dec).not.toBeUndefined();
    expect(isFunction(dec)).toBeTruthy();
    mockObj = {
      [testProp]: 2
    };
    dec(mockObj, testProp);
  })

  it('with number within', () => {
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = 'A range error occurred';
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with number lower edge', () => {
    mockObj[testProp] = 1;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = 'A range error occurred';
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with number upper edge', () => {
    mockObj[testProp] = 100;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = 'A range error occurred';
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });
  it('with number lower edge', () => {
    mockObj[testProp] = 1;
    expect(mockObj[`__has__${Range.internal}__from__${testProp}`]).toEqual(from);
    expect(mockObj[`__has__${Range.internal}__to__${testProp}`]).toEqual(to);
    const expectMsg = 'A range error occurred';
    expect(mockObj[`__err__${Range.internal}__${testProp}`]).toEqual(expectMsg);
    expect(mockObj[`__isValid__${Range.internal}__${testProp}`]).toEqual(true);
  });

});
