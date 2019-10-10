import { isArray, isObject } from 'util';

/**
 * The support method for the render method of components. Just import, but never call directly. The TypeScript compiler uses this function.
 *
 * It's a default export, so this import will work:
 *
 * `import JSX from 'nyaf`;
 *
 * Also, don't forget to setup *tsconfig.json* properly to support *jsx* and use the namespace JSX (in uppercase letters).
 *
 * */
const JSX = {
  createElement(name: string, props: { [id: string]: string }, ...content: string[]) {
    const flat = function(arr1: string[]) {
      return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val)), []);
    };

    props = props || {};
    let repeatStore = [];
    let ifStore = true;
    const styleStore: { [rule: string]: string } = {};
    const propsstr =
      Object.keys(props)
        .map(key => {
          const value = props[key];
          // console.log(`jsx processing ${key}='${value}'`);
          switch (key) {
            case 'className':
              if (isArray(value)) {
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
              break;
            case 'n-if':
              ifStore = !!value;
              break;
            case 'n-repeat':
              if (value) {
                // we cannot transfer data other than as string with web components
                const repeat = JSON.parse(value);
                // expecting let x of y, with y is an array
                console.log('repeat', repeat);
                if (isArray(repeat)) {
                  // expect an object, that's props can be bound to others
                  repeatStore = repeat;
                } else {
                  throw new Error('repeat expects an array');
                }
              }
              break;
            // no handling, fall through to default
            default:
              if (key.startsWith('n-on-')) {
                const val = `${value}`.replace(/\(.\)\s+=>\s+this\./, '').replace(/\(.\)/, '');
                return `${key}='${val}'`;
              }
              // check for implicit bindings
              if (isArray(value) || isObject(value)) {
                delete props[key];
                return `${key}='${JSON.stringify(value)}'`;
              } else {
                // single quotes to process JSON.stringify (needed, because web components support only string)
                return `${key}='${value}'`;
              }
          }
        })
        .join(' ') || '';
    if (content && content.length && Array.isArray(content[0])) {
      content = <any>content[0];
    }
    if (!name) {
      return `${flat(content).join('')}`; // support for <> </> fake container tag
    }
    if (!ifStore) {
      return ''; // if excluded by condition return nothing at all before any further processing
    }
    if (repeatStore.length) {
      // we just repeat the element itself by calling it recursively
      delete props['n-repeat']; // prevent overflow
      const targetProps = Object.keys(props).filter(p => props[p] && typeof props[p] === 'string' && props[p].startsWith('@'));
      return repeatStore.map(r => {
        targetProps.map(t => (props[t] = r[t]));
        return this.createElement(name, props, content);
      });
    }
    return `<${name} ${propsstr}> ${flat(content).join('')}</${name}>`;
  }
};
export default JSX;
