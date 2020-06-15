export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line:no-bitwise
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

export function isArray(ar: any) {
  return Array.isArray(ar);
}

export function isBoolean(arg: any) {
  return typeof arg === 'boolean';
}

export function isNull(arg: any) {
  return arg === null;
}

export function isNullOrUndefined(arg: any) {
  return arg == null;
}

export function isNumber(arg: any) {
  return typeof arg === 'number';
}

export function isString(arg: any) {
  return typeof arg === 'string';
}

export function isSymbol(arg: any) {
  return typeof arg === 'symbol';
}

export function isUndefined(arg: any) {
  return arg === void 0;
}

export function isRegExp(re: any) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

export function isObject(arg: any) {
  return typeof arg === 'object' && arg !== null;
}

export function isDate(d: any) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

export function isError(e: any) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

export function isFunction(arg: any) {
  return typeof arg === 'function';
}

export function isPrimitive(arg: any) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function objectToString(o: any) {
  return Object.prototype.toString.call(o);
}