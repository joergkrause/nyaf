import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import {tablePropsHeader} from '../Defs';

@CustomElement('guide-radio')
export class GuideRadio extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import { Radio } from "@nyaf/ui";`;
    const codeUsing = `
            <ui-radio name="r11" caption="Radio" checked/>
            <ui-radio name="r11" caption="Radio" />
            <ui-radio name="r12" caption="Radio" disabled/>
            <ui-radio name="r12" caption="Radio" checked disabled/>

            <ui-radio name="r21" caption="Radio" checked variant={2}/>
            <ui-radio name="r21" caption="Radio" variant={2} />
            <ui-radio name="r22" caption="Radio" disabled variant={2}/>
            <ui-radio name="r22" caption="Radio" checked disabled variant={2}/>
        `;

    const tablePropsBody = [
      ['caption', 'empty', 'Element caption'],
      ['variant', '1', 'Element variant modern or material'],
      ['cls', 'empty', 'Additional component classes'],
      ['className', 'empty', 'Additional component classes'],
      ['clsCheckbox', 'empty', 'Additional component classes'],
      ['clsCheck', 'empty', 'Additional classes for check sub-component'],
      ['clsCaption', 'empty', 'Additional classes for component caption'],
      ['n-on-check', '()=>{}', 'Callback for check state'],
      ['n-on-uncheck', '()=>{}', 'Callback for uncheck state'],
      ['n-on-change', '()=>{}', 'Callback for change state'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Radio</h1>

        <p className={'text-leader2'}>
          Create a styled radio buttons with support for highly used options.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <ui-radio name='r11' caption='Radio' checked={true} />
              <ui-radio name='r11' caption='Radio' />
              <ui-radio name='r12' caption='Radio' disabled />
              <ui-radio name='r12' caption='Radio' checked disabled />
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <ui-radio name='r21' caption='Radio' checked variant={2} />
              <ui-radio name='r21' caption='Radio' variant={2} />
              <ui-radio name='r22' caption='Radio' disabled variant={2} />
              <ui-radio name='r22' caption='Radio' checked disabled variant={2} />
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
