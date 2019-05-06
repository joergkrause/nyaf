import { isArray } from 'util';
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
            case 'repeat':
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
              // check for implicit bindings
              if (value.startsWith('@') && key.startsWith('for-')) {
                delete props[key];
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
    if (repeatStore.length){
      // repeat element
      let metaProps = props;
      return repeatStore.map(r => {
        Object.keys(r).forEach(k => metaProps[k] = r[k]);
        return this.createElement(name, props, content)
      });
    }    
    return `<${name} ${propsstr}> ${flat(content).join('')}</${name}>`;
  }
};
export default JSX;
