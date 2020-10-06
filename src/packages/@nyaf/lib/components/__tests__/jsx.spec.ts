import JSX from '../jsx.classic';
import { isFunction } from '../../code/utils';

describe('JSX classic engine', () => {

  it('base test', () => {
    expect(isFunction(JSX.createElement)).toBeTruthy();
  });

  it('n-hide', () => {
    const e = JSX.createElement('div', { 'n-hide': true });
    expect(e).toEqual('<div style="display:none;"></div>');
  });

  it('n-show', () => {
    const e = JSX.createElement('div', { 'n-show': true });
    expect(e).toEqual('<div></div>');
  });

  it('n-hide', () => {
    const e = JSX.createElement('div', { 'n-hide': false });
    expect(e).toEqual('<div></div>');
  });

  it('n-show', () => {
    const e = JSX.createElement('div', { 'n-show': false });
    expect(e).toEqual('<div style="display:none;"></div>');
  });

  it('n-if', () => {
    const e = JSX.createElement('div', { 'n-if': false });
    expect(e).toEqual('');
  });

  it('n-if', () => {
    const e = JSX.createElement('div', { 'n-if': true });
    expect(e).toEqual('<div></div>');
  });

  it('n-else', () => {
    const e = JSX.createElement('div', { 'n-else': true });
    expect(e).toEqual('');
  });

  it('n-else', () => {
    const e = JSX.createElement('div', { 'n-else': false });
    expect(e).toEqual('<div></div>');
  });

  it('n-iif', () => {
    const e = JSX.createElement('div', { 'n-iif': true, 'value': { name: 'field' } });
    expect(e).toEqual('<div n-bind=\'undefined\' value=\'{"name":"field"}\' n-type-value=\'object\'></div>');
  });

  it('n-expand', () => {
    const e = JSX.createElement('div', { 'n-expand': 'notset' });
    expect(e).toEqual('<div></div>');
  });

  it('n-on-click', () => {
    function clickTest() { }
    const e = JSX.createElement('div', { 'n-on-click': clickTest });
    expect(e).toEqual('<div n-on-click=\'this.clickTest\'></div>');
  });

  it('n-repeat', () => {
    const mockConsole = {
      error: jest.fn() // (text: string) => {}
    };
    const legacy = console.error;
    console.error = mockConsole.error;
    const spyError = jest.spyOn(mockConsole, 'error');
    const e = JSX.createElement('div', { 'n-repeat': [1, 2, 3] });
    expect(spyError).toBeCalled();
    console.error = legacy;
  });

  it('class', () => {
    const e = JSX.createElement('div', { 'class': 'btn btn-sm' });
    expect(e).toEqual('<div class="btn btn-sm"></div>');
  });

  it('class array', () => {
    const e = JSX.createElement('div', { 'class': ['btn btn-sm', 'btn-primary'] });
    expect(e).toEqual('<div class="btn btn-sm btn-primary"></div>');
  });

  it('values --> boolean', () => {
    const e = JSX.createElement('div', { 'param': false });
    expect(e).toEqual('<div param=\'false\' n-type-param=\'boolean\'></div>');
  });

  it('values --> array', () => {
    const e = JSX.createElement('div', { 'param': ['red pill', 'blue pill'] });
    expect(e).toEqual('<div param=\'["red pill","blue pill"]\' n-type-param=\'array\'></div>');
  });

  it('values --> object', () => {
    const e = JSX.createElement('div', { 'param': { test: 123 } });
    expect(e).toEqual('<div param=\'{"test":123}\' n-type-param=\'object\'></div>');
  });

  it('values --> number', () => {
    const e = JSX.createElement('div', { 'param': 23 });
    expect(e).toEqual('<div param=\'23\' n-type-param=\'number\'></div>');
  });

  it('values --> string ""', () => {
    const e = JSX.createElement('div', { 'param': 'Something with "quotes"' });
    expect(e).toEqual('<div param=\'Something with "quotes"\'></div>');
  });

  it('values --> string \'\'', () => {
    const e = JSX.createElement('div', { 'param': "Something with 'quotes'" });
    expect(e).toEqual('<div param=\'Something with &quot;quotes&quot;\'></div>');
  });

  it('values --> string ', () => {
    const e = JSX.createElement('div', { 'param': "Something" });
    expect(e).toEqual('<div param=\'Something\'></div>');
  });

  it('Fragment', () => {
    const e = JSX.createElement('');
    expect(e).toEqual('');
  });

  it('Fragment with children', () => {
    const e = JSX.createElement('', null, JSX.createElement('div'));
    expect(e).toEqual('<div></div>');
  });

})