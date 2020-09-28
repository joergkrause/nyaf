import { GlobalProvider } from '../code/globalprovider';
import { isNumber, isBoolean, isArray, isObject, isFunction } from '../code/utils';

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
  createElement(name: string | null, props: { [id: string]: any }, ...content: string[]): string {
    content = [].concat.apply([], content);
    const flat = function (arr1: string[]): string[] {
      return arr1.reduce((acc: string[], val: string[] | string) => (Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val)), []);
    };

    props = props || {};
    let ifStore = true;
    let isRepeater = false;
    const styleStore: { [rule: string]: string } = {};
    let propsstr =
      Object.keys(props)
        .map(key => {
          // TODO: make this an Map and check for duplicate attributes
          const value = props[key];
          switch (key) {
            // class allows an array
            case 'className':
            case 'class':
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
            case 'n-iif':
              const expression = props['n-iif'];
              // Create a proxy from expression
              // if proxy changes, evaluate expression
              // if false, remove element, but keep a parent reference
              // if true, use parent reference to re-add the element
              return `n-bind='${value.name}'`;
              break;
            case 'n-repeat':
              try {
                const data: [] = JSON.parse(props['n-repeat']);
                delete props['n-repeat'];
                const resolvedProps = Object.create(props);
                const dataElements = data.map(dataItem => {
                  Object.keys(props).forEach(prop => {
                    resolvedProps[prop] = dataItem[props[prop].split('.')[1]];
                  });
                  const resolvedContent: string[] = [];
                  if (content) {
                    content.forEach(c => {
                      const parts = c.match(/(.+)\s+=>\s+(.+)\.(.+)/);
                      if (parts && parts.length) {
                        const part = parts[3];
                        resolvedContent.push(dataItem[part]);
                      } else {
                        resolvedContent.push(c);
                      }
                    });
                  }
                  const element = this.createElement(name, resolvedProps, resolvedContent);
                  return element;
                });
                isRepeater = true;
                return dataElements.join('');
              } catch (err) {
                console.error('Cannot parse n-repeat data. Need an array of objects. ' + err);
              }
              break;
            case 'n-expand':
              return GlobalProvider.TagExpander.get(value)?.expand();
            default:
              if (key.startsWith('n-on-')) {
                if (value.name === key) {
                  return `${key}='${value.toString().replace(/'/g, '&#39;')}'`;
                }
                if (isFunction(value)) {
                  return `${key}='this.${value.name}'`;
                }
              }
              // check for implicit bindings of complex objects
              // Stringify and mark as complex to handle the read/write procedure in the Proxy handler
              if (isArray(value)) {
                delete props[key];
                return `${key}='${JSON.stringify(value)}' n-type-${key}='array'`;
              } else if (isObject(value)) {
                delete props[key];
                return `${key}='${JSON.stringify(value)}' n-type-${key}='object'`;
              } else if (isBoolean(value)) {
                return `${key}='${JSON.stringify(value)}' n-type-${key}='boolean'`;
              } else if (isNumber(value)) {
                return `${key}='${JSON.stringify(value)}' n-type-${key}='number'`;
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
    // if repeater, we don't return the former repeater template, but just the generated code
    return isRepeater ? propsstr : (`<${name}${propsstr ? ' ' : ''}${propsstr}>${flat(content).join('')}</${name}>`);
  }
};
export default JSX;
