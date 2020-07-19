import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import {tablePropsHeader} from '../Defs';

@CustomElement('guide-splitbutton')
export class GuideSplitButton extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {SplitButton} from '@nyaf/ui';`;
    const codeUseDefault = `
            <ui-splitbutton>
                <ui-button>Reply</Button>
                <ui-button/>
                <ul>
                    <li><a href={'#'}>Item 1</a></li>
                    <li><a href={'#'}>Item 2</a></li>
                    <li><a href={'#'}>Item 3</a></li>
                </ul>
            </ui-splitbutton>
        `;

    const tablePropsData = [
      ['<code>cls</code>', '', 'Additional classes'],
      ['<code>className</code>', '', 'Additional classes'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Split button</h1>
        <p className='text-leader2'>
          With the Metro 4 you can easily create different types of stylized split buttons.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          <code>SplitButton</code> is a composite component and consists of the main button, drop-down list, and a drop-down list control button.
                </p>
        <div className='example'>
          <ui-row>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton>
                <ui-button>Reply</ui-button>
                <ui-button />
                <ul>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-splitbutton>
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton>
                <ui-button cls={'primary'}>Reply</ui-button>
                <ui-button cls={'alert'} />
                <ul>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-splitbutton>
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton clsMainButton={'warning rounded'} clsSplitButton={'info rounded'}>
                <ui-button>Reply</ui-button>
                <ui-button />
                <ul>
                  <li><a href={'#'}>Item 1</a></li>
                  <li><a href={'#'}>Item 2</a></li>
                  <li><a href={'#'}>Item 3</a></li>
                </ul>
              </ui-splitbutton>
            </ui-cell>
            <ui-cell cls={'cell-md-3'}>
              <ui-splitbutton clsMainButton={'success outline'} clsSplitButton={'info rounded'}>
                <ui-button>Reply</ui-button>
                <ui-button onClick={() => alert('Clicked')}>...</ui-button>
              </ui-splitbutton>
            </ui-cell>
          </ui-row>
        </div>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsData} />

        <br />
        <h3>Using</h3>
        <p className='remark warning'>
          Button elements must be followed in strict order: main button, list control button and list. The list is an optional item.
                </p>
        <demo-prismcode language='js' code={codeUseDefault} />

        <br />

        <br />
      </demo-article>
    );
  }
}
