import { isArray, isObject } from 'util';
import { objectExpression } from '@babel/types';

/**
 * The basic entry point.
 */
export const JSX = {
  createElement(name: string, props: { [id: string]: string }, ...content: string[]) {
    var flat = function(arr1: string[]) {
      return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val)), []);
    };

    props = props || {};
    let repeatStore = [];
    let ifStore = true;
    const propsstr =
      Object.keys(props)
        .map(key => {
          const value = props[key];
          console.log(`jsx processing ${key}='${value}'`);
          switch (key) {
            case 'className':
              if (isArray(value)) {
                return `class="${(<any>value).join(' ')}"`;
              } else {
                return `class="${value}"`;
              }
            case 'n-if':
              ifStore = !!value;
              break;
              case 'n-for':
              case 'n-repeat':
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
              break;
            // no handling, fall through to default
            default:
              if (key.startsWith('n-on-')){
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
    if (!name) return `${flat(content).join('')}`; // support for <> </> fake container tag
    if (!ifStore) return ''; // if excluded by condition return nothing at all before any further processing
    if (repeatStore.length) {
      // repeat element, if a "repeat" attribute has been found
      let metaProps = props;
      // we just repeat the element itself by calling it recursively
      delete props['n-repeat']; // prevent overflow
      delete props['n-for']; // prevent overflow
      let targetProps = Object.keys(props).filter(p => props[p].startsWith('@'));
      return repeatStore.map(r => {
        targetProps.map(t => (props[t] = r[t]));
        return this.createElement(name, props, content);
      });
    }
    return `<${name} ${propsstr}> ${flat(content).join('')}</${name}>`;
  }
};
export default JSX;
