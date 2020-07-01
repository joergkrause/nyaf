import JSX from './jsx';
import { isFunction } from '../code/utils';

test('JSX base test', () => {
  expect(isFunction(JSX.createElement)).toBeTruthy();
});

test('n-hide', () => {
  const e = JSX.createElement('div', { 'n-hide': true });
  expect(e).toEqual('<div style="display:none;"></div>');
});

test('n-show', () => {
  const e = JSX.createElement('div', { 'n-show': true });
  expect(e).toEqual('<div ></div>');
});

test('n-hide', () => {
  const e = JSX.createElement('div', { 'n-hide': false });
  expect(e).toEqual('<div ></div>');
});

test('n-show', () => {
  const e = JSX.createElement('div', { 'n-show': false });
  expect(e).toEqual('<div style="display:none;"></div>');
});