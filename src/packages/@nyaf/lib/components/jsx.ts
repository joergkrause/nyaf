import { GlobalProvider } from '../lib/globalprovider';
import { isNumber, isBoolean, isArray, isObject } from '../lib/utils';

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
const JSX = {
  createElement(name: string, props: { [id: string]: any }, ...content: string[]) {
    content = [].concat.apply([], content);
    const flat = function (arr1: string[]) {
      return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val)), []);
    };

    props = props || {};
    let ifStore = true;
    const styleStore: { [rule: string]: string } = {};
    let propsstr =
      Object.keys(props)
        .map(key => {
          const value = props[key];
          switch (key) {
            case 'className':
              if (Array.isArray(value)) {
                return `class="${(<any>value).join(' ')}"`;
              } else {
                return `class="${value}"`;
              }
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
              if (GlobalProvider.TagExpander.get(value)) {
                return GlobalProvider.TagExpander.get(value).expand();
              }
              break;
            default:
              if (key.startsWith('n-on-')) {
                return `${key}='${value.toString().replace(/'/g, '&#39;')}'`;
              }
              // check for implicit bindings of complex objects
              if (isArray(value) || isObject(value)) {
                delete props[key];
                // Stringify and mark as complex to handle the read/write procedure in the Proxy handler
                return `${key}='${JSON.stringify(value)}' __${key}__ __${key}__obj__`;
              } else if (isBoolean(value)) {
                return `${key}='${JSON.stringify(value)}' __${key}__ __${key}__bool__`;
              } else if (isNumber(value)) {
                return `${key}='${JSON.stringify(value)}' __${key}__ __${key}__num__`;
              } else {
                // single quotes to process JSON.stringify (needed, because web components support only string)
                // In case argument has already single quotes, we replace with escaped double quotes
                if (value !== null && value !== undefined) {
                  const sanitizedValue = value.toString().replace(/'/g, '&quot;');
                  return `${key}='${sanitizedValue}'`;
                }
                if (value !== null) {
                  return `${key}='${key}'`;
                }
                // we rule null out as "please don't write this attribute at all"
              }
          }
        })
        .join(' ') || '';
    if (!name) {
      return `${flat(content).join('')}`; // support for <> </> fake container tag
    }
    if (!ifStore) {
      return ''; // if excluded by condition return nothing at all before any further processing
    }
    if (styleStore && Object.keys(styleStore).length > 0) {
      const styles = Object.keys(styleStore).map(o => `${o}:${styleStore[o]};`);
      propsstr += `style="${styles}"`;
    }
    return (`<${name} ${propsstr}>${flat(content).join('')}</${name}>`);
  }
};
export default JSX;
