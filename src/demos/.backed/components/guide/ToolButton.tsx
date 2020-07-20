import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import Defs, { tablePropsHeader } from '../Defs';

@CustomElement('guide-toolbutton')
export class GuideToolButton extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {ToolBar, ToolButton} from '@nyaf/ui';`;
    const codeUseDefault = `
            <ui-toolbar>
                <ui-toolbutton><Icon name={'rocket'}/></ui-toolbutton>
                <ui-toolbutton cls={'text-button'}>Open</ui-toolbutton>
                <ui-toolbutton as={'a'} href={'#'}><Icon name={'printer'}/></ui-toolbutton>
            </ui-toolbar>
        `;
    const codeUseVertical = `
            <ui-toolbar vertical={true}>
                <ui-toolbutton><Icon name={'rocket'}/></ui-toolbutton>
                <ui-toolbutton cls={'text-button'}>Open</ui-toolbutton>
                <ui-toolbutton as={'a'} href={'#'}><Icon name={'printer'}/></ui-toolbutton>
            </ui-toolbar>
        `;
    const codeUserAnchor = `<ui-toolbutton as={'a'} href={'#'}><Icon name={'printer'}/></ui-toolbutton>`;

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>ToolBar &amp; ToolButton</h1>

        <p className={'text-leader2'}>
          If you need to create toolbar, Metro 4 provides the special components.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          If you need to create toolbar, Metro 4 provides the special components fro this: <code>&lt;ToolBar/&gt;</code> and <code>&lt;ToolButton/&gt;</code>.
                    Toolbar buttons support accent mode (primary, alert, ...), outline mode and rounded corners.
                </p>
        <div className='example'>
          <ui-toolbar>
            <ui-toolbutton><ui-icon name={'rocket'} /></ui-toolbutton>
            <ui-toolbutton cls={'text-button'}>Open</ui-toolbutton>
            <ui-toolbutton as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
          </ui-toolbar>
          <ui-toolbar>
            <ui-toolbutton cls={'primary'}><ui-icon name={'rocket'} /></ui-toolbutton>
            <ui-toolbutton cls={'info text-button'}>Open</ui-toolbutton>
            <ui-toolbutton cls={'alert'} as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
          </ui-toolbar>
          <ui-toolbar>
            <ui-toolbutton cls={'primary outline'}><ui-icon name={'rocket'} /></ui-toolbutton>
            <ui-toolbutton cls={'info text-button outline'}>Open</ui-toolbutton>
            <ui-toolbutton cls={'alert outline'} as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
          </ui-toolbar>
          <ui-toolbar>
            <ui-toolbutton cls={'primary rounded'}><ui-icon name={'rocket'} /></ui-toolbutton>
            <ui-toolbutton cls={'info text-button rounded'}>Open</ui-toolbutton>
            <ui-toolbutton cls={'alert rounded'} as={'a'} href={'#'}><ui-i name={'printer'} /></ui-toolbutton>
          </ui-toolbar>
        </div>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUseDefault} />

        <br />
        <h4>ToolBar props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader}>
          <tbody>
            <tr>
              <td><code>cls</code>, <code>className</code></td>
              <td>Button classes</td>
            </tr>
          </tbody>
        </ui-table>

        <br />
        <h4>ToolButton props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader}>
          <tbody>
            <tr>
              <td><code>as</code></td>
              <td><code>span</code></td>
              <td>Semantic element for button</td>
            </tr>
            <tr>
              <td><code>cls</code>, <code>className</code></td>
              <td></td>
              <td>Button classes</td>
            </tr>
          </tbody>
        </ui-table>
        <p>
          You can also use any allowed props for the button. Example, if semantic element is <code>anchor</code>, you can use prop <code>href</code> for define link target.
                </p>
        <demo-prismcode language='js' code={codeUserAnchor} />

        <br />
        <h3>Vertical ToolBar</h3>
        <p>
          If you need to create <code>&lt;ToolBar/&gt;</code> with vertical orientation, use prop <code>vertical={Defs.OPEN_BRACE + 'true' + Defs.CLOSE_BRACE}</code>.
                </p>
        <div className='example'>
          <ui-toolbar vertical={true}>
            <ui-toolbutton><ui-icon name={'rocket'} /></ui-toolbutton>
            <ui-toolbutton><ui-icon name={'folder'} /></ui-toolbutton>
            <ui-toolbutton as={'a'} href={'#'}><ui-icon name={'printer'} /></ui-toolbutton>
          </ui-toolbar>
        </div>
        <demo-prismcode language='js' code={codeUseVertical} />

        <br />

        <br />
      </demo-article>
    );
  }
}
