import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-hamburger')
export class GuideHamburger extends BaseComponent<{}> {

  hamburgerState: boolean;

  constructor() {
    super();
    this.hamburgerState = false;
  }

  toggleHamburger() {
    this.hamburgerState = !this.hamburgerState;
    this.setup();
  }

  async render() {
    const codeImport = `import {Hamburger} from "@nyaf/ui";`;
    const codeUsing = `
            <ui-hamburger/>
            <ui-hamburger theme="dark"/>
            <ui-hamburger variant="arrow-left" active="true"/>
        `;

    const tablePropsBody = [
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['variant', 'menu-down', 'Hamburger transform variant: <code>menu-down</code>, <code>menu-up</code>, <code>arrow-left</code>, <code>arrow-right</code>'],
      ['theme', 'light', 'Color theme: <code>light</code>, <code>dark</code>'],
      ['active', 'false', 'Hamburger state'],
      ['onClick', '()=>{}', 'Hamburger click event callback'],
    ];

    return await (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Hamburger</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          <code>Hamburger</code> is a special type of button to show and toggle open/close state of any components, example - <code>AppBar</code>.
                    This button can transform from one state to any.
                </p>
        <demo-example>
          <ui-appbar cls={'pos-relative z-dropdown'} hamburgerColor={'dark'} expandPoint={null}>
            <ui-appbar-item isBrand={true} name={'Metro 4 for React'} />
            <ui-appbar-menu cls={'ml-auto'} >
              <li><a href={'#'}>Home</a></li>
              <li><a href={'#'}>Documentation</a></li>
              <li><a href={'#'}>GitHub</a></li>
            </ui-appbar-menu>
          </ui-appbar>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUsing} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBody} />

        <br />
        <h4>Hamburger themes</h4>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-6 bg-dark'>
              <ui-hamburger />
              <span className='fg-white ml-4'>Theme <code>light</code> (default)</span>
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <ui-hamburger theme='dark' />
              <span className='ml-4'>Theme <code>dark</code></span>
            </ui-cell>
          </ui-row>
        </demo-example>

        <br />
        <h4>Hamburger variants</h4>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <ui-button onClick={this.toggleHamburger} title='Toggle Hamburger' />
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <ui-hamburger variant='arrow-left' active={this.hamburgerState} theme='dark' />
              <ui-hamburger variant='arrow-right' active={this.hamburgerState} theme='dark' />
              <ui-hamburger variant='menu-down' active={this.hamburgerState} theme='dark' />
              <ui-hamburger variant='menu-up' active={this.hamburgerState} theme='dark' />
            </ui-cell>
          </ui-row>
        </demo-example>

        <br />

        <br />
      </demo-article>
    );
  }
}
