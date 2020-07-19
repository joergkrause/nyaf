import JSX, { CustomElement, BaseComponent, Properties } from '@nyaf/lib';

import Prism from 'prismjs';

@CustomElement('demo-prismcode')
@Properties<{ plugins: any, language: string, children: any, code: string }>({
  plugins: null,
  language: '',
  children: null,
  code: ''
})
export class PrismCode extends BaseComponent<{ plugins: any, language: string, children: any, code: string }> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }

  highlight() {
    Prism.highlightElement(this);
  }

  cleanCode(code) {
    const txt = code
      .replace(/^[\r\n]+/, '')	// strip leading newline
      .replace(/\s+$/g, '');

    if (/^\S/gm.test(txt)) {
      return txt;
    }

    let mat, str, re = /^[\t ]+/gm, len, min = 1e3;

    while (mat = re.exec(txt)) {
      len = mat[0].length;

      if (len < min) {
        min = len;
        str = mat[0];
      }
    }

    if (min === 1e3) {
      return;
    }

    return txt.replace(new RegExp('^' + str, 'gm'), '');
  }

  async render() {
    const { plugins, language, children } = this.data;
    const code = this.cleanCode(this.data.code);
    return await (
      <pre className={!plugins ? '' : plugins.join(' ')}>
        <code className={`language-${language}`}>
          {this.data.code ? code : children}
        </code>
      </pre>
    );
  }
}
