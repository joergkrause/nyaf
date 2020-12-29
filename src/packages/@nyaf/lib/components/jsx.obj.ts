import { GlobalProvider } from '../code/globalprovider';
import { isNumber, isBoolean, isArray, isObject, isFunction, isString } from '../code/utils';

export interface JsxObj {
  element: HTMLElement,
  props: any,
  content: JsxObj[];
}

/**
 * The support method for the render method of components. Just import, but never call directly. The TypeScript compiler uses this function.
 *
 * It's a default export, so this import will work:
 *
 * `import JSX from '@nyaf/lib';`
 *
 * Usually it'S combined with the import of the base class:
 *
 * `import JSX, { BaseComppnent } from '@nyaf/lib';`
 *
 * Also, don't forget to setup *tsconfig.json* properly to support *jsx* and use the namespace JSX (in uppercase letters).
 *
 * */
const JSX: any = {
  Fragment: null,
  createElement(name: string | null, props: { [id: string]: any }, ...content: any[]): HTMLElement | HTMLElement[] {
    content = [].concat.apply([], content);
    const flat = function (arr1: string[]): string[] {
      return arr1.reduce((acc: string[], val: string[] | string) => (Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val)), []);
    };

    props = props || {};
    let ifStore = true;
    const styleStore: { [rule: string]: string } = {};
      Object.keys(props)
        .forEach(key => {
          // TODO: make this an Map and check for duplicate attributes
          let value = props[key];
          switch (key) {
            // class allows an array
            case 'className':
            case 'class':
              if (Array.isArray(value)) {
                props['class'] = `${(<any>value).join(' ')}`;
              }
              break;
            case 'n-outlet':
              props['n-outlet'] = value.toString();
              break;
            case 'n-router-outlet':
              props['n-router-outlet'] = value.toString();
              break;
            case 'n-hide':
              if (!!value) {
                styleStore['display'] = 'none';
              }
              break;
            case 'n-show':
              if (!value) {
                styleStore['display'] = 'none';
              }
              break;
            case 'n-else':
              ifStore = !value;
              break;
            case 'n-if':
              ifStore = !!value;
              break;
            case 'n-expand':
              const extraProsp = GlobalProvider.TagExpander.get(value)?.expand();
              Object.assign(props, extraProsp);
            default:
              if (key.startsWith('n-on-')) {
                // if (value.name === key) {
                //   props[key] = `'${value.toString().replace(/'/g, '&#39;')}'`;
                // }
                if (isFunction(value)) {
                  props[key] = value;
                }
              }
          }
        });
    if (!name) {
      // fragment handling; assume multiple roots
      return content;
    }
    const newElement = document.createElement(name);
    Object.keys(props).forEach(prop => {
      if (isString(props[prop])) {
        newElement.setAttribute(prop, props[prop]);
      } else {
        if (!newElement['__data']) {
          newElement['__data'] = {};
        }
        newElement['__data'][prop] = props[prop];
      }
      if (prop.startsWith('data')) {
        newElement.dataset[prop.substr(prop.indexOf("-") + 1).replace(/-./g, x=>x[1].toUpperCase())] = props[prop];
      }
    });
    if (content && content.length) {
      content.forEach(c => {
        if (c instanceof HTMLElement) {
          newElement.appendChild(c);
        } else {
          newElement.appendChild(document.createTextNode(c));
        }
      });
    }
    // if (styleStore) {
    Object.keys(styleStore).forEach(style => {
      console.log(`${styleStore[style]} = styleStore[${style}]`);
    });
    if (!ifStore) return [];
    return [newElement];
  }
};
export default JSX;
