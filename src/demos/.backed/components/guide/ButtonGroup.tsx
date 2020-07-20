import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-buttongroup')
export class GuideButtonGroup extends BaseComponent<{}> {

  async render() {
    const codeImport = `import {ButtonGroup} from "@nyaf/ui";`;
    const codeUsing = `
            <ui-buttongroup>
                <ui-button title="1"/>
                <ui-button title="2"/>
                <ui-button title="3"/>
            </ui-buttongroup>

            <ui-buttongroup radio="true">
                <ui-button title="1"/>
                <ui-button title="2"/>
                <ui-button title="3"/>
            </ui-buttongroup>
        `;

    const tablePropsBody = [
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['active', '1', 'Number of active button by default, must by int or array of int'],
      ['clsActive', 'active', 'Class for active button'],
      ['clsButton', 'null', 'Additional class for buttons'],
      ['onButtonClick', '()=>{}', 'Callback for button click event, callback receive a button React element'],
    ];

    return await (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>ButtonGroup</h1>

        <p className={'text-leader2'}>
          Group buttons using ButtonGroup component.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          You can group buttons using component <code>ButtonGroup</code> and set switch mode: <code>check</code> or <code>radio</code>.
                </p>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <ui-buttongroup>
                <ui-button title='1' />
                <ui-button title='2' />
                <ui-button title='3' />
              </ui-buttongroup>
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <ui-buttongroup radio={true}>
                <ui-button title='1' />
                <ui-button title='2' />
                <ui-button title='3' />
              </ui-buttongroup>
            </ui-cell>
          </ui-row>
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

        <br />
      </demo-article>
    );
  }
}
