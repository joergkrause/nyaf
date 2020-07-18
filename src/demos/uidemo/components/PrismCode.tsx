import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import Prism from "prismjs"


@CustomElement('demo-prismcode')
export class PrismCode extends BaseComponent<{}> {
    constructor() {
        super();
        this.ref = React.createRef();
        this.highlight = this.highlight.bind(this);
        this.cleanCode = this.cleanCode.bind(this);
    }

    componentDidMount() {
        this.highlight();
    }

    componentDidUpdate() {
        this.highlight()
    }

    highlight(){
        if (this.ref && this.ref.current) {
            Prism.highlightElement(this.ref.current)
        }
    };

    cleanCode(code){
        const txt = code
            .replace(/^[\r\n]+/, "")	// strip leading newline
            .replace(/\s+$/g, "");

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

        if (min === 1e3)
            return;

        return  txt.replace(new RegExp("^" + str, 'gm'), "");
    };

    async render() {
        const { plugins, language, children } = this.data;
        const code = this.cleanCode(this.data.code);
        return await (
            <pre className={!plugins ? "" : plugins.join(" ")}>
                <code ref={this.ref} className={`language-${language}`}>
                  {this.data.code ? code : children}
                </code>
            </pre>
        )
    }
}