import { isArray } from 'util';

/**
 * The basic entry point. 
 */
export const JSX = {
	createElement(name: string, props: { [id: string]: string }, ...content: string[]) {
		var flat = function(arr1: string[]) {
			return arr1.reduce((acc, val) => (Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val)), []);
		};

		props = props || {};
		const propsstr =
			Object.keys(props)
				.map(key => {
					const value = props[key];
					switch (key) {
						case 'className':
							if (isArray(value)) {
								return `class="${(<any>value).join(' ')}"`;
							} else {
								return `class="${value}"`;
              }
            case 'repeat':
              const repeat = value.split(' ');
              // expecting let x of y, with y is an array
              console.log('repeat', repeat);
              break;
						// no handling, fall through to default
						default:
							return `${key}="${value}"`;
					}
				})
				.join(' ') || '';
		if (content && content.length && Array.isArray(content[0])) {
			content = <any>content[0];
		}
		if (!name) return `${flat(content).join('')}`; // support for <> </> fake container tag
		return `<${name} ${propsstr}> ${flat(content).join('')}</${name}>`;
	}
};
export default JSX;
