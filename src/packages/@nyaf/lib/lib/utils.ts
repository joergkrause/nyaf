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

export interface NameofOptions {
  /**
   * Take only the last property of nested properties.
  */
  lastProp?: boolean;
}

function cleanseAssertionOperators(parsedName: string): string {
  return parsedName.replace(/[?!]/g, '');
}

export function of<T extends Object>(nameFunction: ((obj: T) => any) | { new(...params: any[]): T }, options?: NameofOptions): string {
  return `@@${nameofInner(nameFunction, options)}@@`;
}

function nameofInner<T extends Object>(nameFunction: ((obj: T) => any) | { new(...params: any[]): T }, options?: NameofOptions): string {
  const fnStr = nameFunction.toString();

  // ES6 class name:
  // "class ClassName { ..."
  if (
      fnStr.startsWith('class ')
      // Theoretically could, for some ill-advised reason, be "class => class.prop".
      && !fnStr.startsWith('class =>')
  ) {
      return cleanseAssertionOperators(
          fnStr.substring(
              'class '.length,
              fnStr.indexOf(' {')
          )
      );
  }

  // ES6 prop selector:
  // "x => x.prop"
  if (fnStr.includes('=>')) {
      return cleanseAssertionOperators(
          fnStr.substring(
              fnStr.indexOf('.') + 1
          )
      );
  }

  // ES5 prop selector:
  // "function (x) { return x.prop; }"
  // webpack production build excludes the spaces and optional trailing semicolon:
  //   "function(x){return x.prop}"
  // FYI - during local dev testing i observed carriage returns after the curly brackets as well
  // Note by maintainer: See https://github.com/IRCraziestTaxi/ts-simple-nameof/pull/13#issuecomment-567171802 for explanation of this regex.
  const matchRegex = /function\s*\(\w+\)\s*\{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;

  const es5Match = fnStr.match(matchRegex);

  if (es5Match) {
      return (options && options.lastProp)
          ? es5Match[3]
          : es5Match[1];
  }

  // ES5 class name:
  // "function ClassName() { ..."
  if (fnStr.startsWith('function ')) {
      return cleanseAssertionOperators(
          fnStr.substring(
              'function '.length,
              fnStr.indexOf('(')
          )
      );
  }

  // Invalid function.
  throw new Error('nameof: Invalid function.');
}