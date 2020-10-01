import JSX from '../jsx.classic';
import { isFunction } from '../../code/utils';

test('JSX base test', () => {
  expect(isFunction(JSX.createElement)).toBeTruthy();
});

test('n-hide', () => {
  const e = JSX.createElement('div', { 'n-hide': true });
  expect(e).toEqual('<div style="display:none;"></div>');
});

test('n-show', () => {
  const e = JSX.createElement('div', { 'n-show': true });
  expect(e).toEqual('<div></div>');
});

test('n-hide', () => {
  const e = JSX.createElement('div', { 'n-hide': false });
  expect(e).toEqual('<div></div>');
});

test('n-show', () => {
  const e = JSX.createElement('div', { 'n-show': false });
  expect(e).toEqual('<div style="display:none;"></div>');
});

test('n-if', () => {
  const e = JSX.createElement('div', { 'n-if': false });
  expect(e).toEqual('');
});

test('n-if', () => {
  const e = JSX.createElement('div', { 'n-if': true });
  expect(e).toEqual('<div></div>');
});

test('class', () => {
  const e = JSX.createElement('div', { 'class': 'btn btn-sm' });
  expect(e).toEqual('<div class="btn btn-sm"></div>');
});

test('class array', () => {
  const e = JSX.createElement('div', { 'class': ['btn btn-sm', 'btn-primary'] });
  expect(e).toEqual('<div class="btn btn-sm btn-primary"></div>');
});
