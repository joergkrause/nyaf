import { LifeCycle } from '../components/lifecycle.enum';
import { BaseComponent } from '../components/base.component';

/**
 * A simple uuid function. Here just to avoid linking to another external library.
 */
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line:no-bitwise
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * A simple matchAll polyfill, could be removed if `matchAll` is available nativ.
 * @param str The string to investigate
 * @param regexp The regular expression to process
 * @returns Returns an iterable object with all matches
 */
export function* matchAll(str: string, regexp: RegExp) {
  const flags = regexp.global ? regexp.flags : regexp.flags + "g";
  const re = new RegExp(regexp, flags);
  let match: RegExpExecArray;
  while (match = re.exec(str)) {
    yield match;
  }
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

/** @internal */
export function isArray(arg: any): arg is [] {
  return Array.isArray(arg);
}

/** @internal */
export function isBoolean(arg: any): arg is boolean {
  return typeof arg === 'boolean';
}

/** @internal */
export function isNull(arg: any): arg is null {
  return arg === null;
}

/** @internal */
export function isNullOrUndefined(arg: any): arg is null | undefined {
  return arg == null;
}

/** @internal */
export function isNumber(arg: any): arg is number {
  return typeof arg === 'number';
}

/** @internal */
export function isString(arg: any): arg is string {
  return typeof arg === 'string';
}

/** @internal */
export function isSymbol(arg: any): arg is symbol {
  return typeof arg === 'symbol';
}

/** @internal */
export function isUndefined(arg: any): arg is undefined {
  return arg === void 0;
}

/** @internal */
export function isRegExp(re: any): re is RegExp {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

/** @internal */
export function isObject(arg: any): arg is object {
  return typeof arg === 'object' && arg !== null;
}

/** @internal */
export function isDate(d: any): d is Date {
  return isObject(d) && objectToString(d) === '[object Date]';
}

/** @internal */
export function isError(e: any): e is Error {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

/** @internal */
export function isFunction(arg: any): arg is Function {
  return typeof arg === 'function';
}

/** @internal */
export function isPrimitive(arg: any) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

/** @internal */
function objectToString(o: any): string {
  return Object.prototype.toString.call(o);
}

/** @internal */
export interface NameofOptions {
  /**
   * Take only the last property of nested properties.
  */
  lastProp?: boolean;
}

/** @internal */
function cleanseAssertionOperators(parsedName: string): string {
  return parsedName.replace(/[?!]/g, '');
}

/** @internal */
export function of<T extends Object>(nameFunction: ((obj: T) => any) | (new(...params: any[]) => T), options?: NameofOptions): string {
  return `@@${nameofInner(nameFunction, options)}@@`;
}

/** @internal */
function nameofInner<T extends Object>(nameFunction: ((obj: T) => any) | (new(...params: any[]) => T), options?: NameofOptions): string {
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
  /** @internal */
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

/**
 * Define a data source
 * @param data Select expression as array of objects
 * @typeParam T The view model type
 */
export function from<T extends Object>(data: T[]): string {
  return JSON.stringify(data);
}

/**
 * Select a property from the data defined by {@link from}, used in the `n-repeat` attribute.
 * @param nameFunction Use an expression like `c => c.name`
 * @typeParam T The view model type
 */
export function select<T extends Object>(nameFunction: ((obj: T) => any) | (new(...params: any[]) => T)): string {
  return `@@${nameFunction.toString().substr(nameFunction.toString().indexOf('.') + 1)}@@`;
}
