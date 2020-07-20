import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { METRO_OFF_SITE } from '../Defs';

@CustomElement('guide-intro')
export class GuideIntro extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeInstallNpm = `> npm install @nyaf/ui`;
    const codeInstallYarn = `> yarn add @nyaf/ui`;
    const codeImportComponent = `import {Button} from "@nyaf/ui";`;

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Intro</h1>
        <div className={'text-leader2'}>
          Metro 4 for React is a complete re-implementation of the <a href={METRO_OFF_SITE}>Metro 4</a> components library using React.
                    If you have React setup and Metro 4 for React installed you have everything you need.
                    Metro 4 for React is a collection of over 100+ components ready to use in your reactive application.
                </div>

        <div className={'remark success'}>
          <strong> It has no dependency on jQuery or others.</strong>
        </div>

        <br />

        <br />

        <br />
        <h3>Introduction</h3>
        <p>Metro 4 for React includes common styles, additional color classes, over 100 ready-to-use components, additional utilities and functions to simplify your code.</p>

        <br />
        <h3>Installation</h3>
        <p>
          The best way to consume <code>Metro 4 for React</code> is via the <code>npm package</code> which you can install with <code>npm</code> or <code>yarn</code>.
                </p>
        <h5>npm</h5>
        <demo-prismcode language={'shell'} code={codeInstallNpm} />
        <h5>yarn</h5>
        <demo-prismcode language={'shell'} code={codeInstallYarn} />

        <br />
        <h3>Importing</h3>

        <p>
          You should import individual components like: <code>@nyaf/ui/Button</code> rather than the entire library.
                    Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.
                </p>
        <demo-prismcode language="js" code={codeImportComponent} />

        <br />

        <br />

      </demo-article>
    );
  }
}
