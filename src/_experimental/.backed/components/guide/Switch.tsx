import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-switch')
export class GuideSwitch extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import { Switch } from "@nyaf/ui";`;
    const codeUsing = `
            <ui-switch/>
            <ui-switch checked/>
            <ui-switch caption='Switch'/>

            <ui-switch variant={2}/>
            <ui-switch checked variant={2}/>
            <ui-switch caption='Switch' variant={2}/>

            <ui-switch caption='Switch' disabled/>
            <ui-switch caption='Switch' readOnly={true}/>
        `;

    const tablePropsBody = [
      ['caption', 'empty', 'Element caption'],
      ['variant', '1', 'Element variant modern or material'],
      ['cls', 'empty', 'Additional component classes'],
      ['className', 'empty', 'Additional component classes'],
      ['clsCheckbox', 'empty', 'Additional component classes'],
      ['clsCheck', 'empty', 'Additional classes for check sub-component'],
      ['clsCaption', 'empty', 'Additional classes for component caption'],
      ['onCheck', '()=>{}', 'Callback for check state'],
      ['onUnCheck', '()=>{}', 'Callback for uncheck state'],
      ['onChange', '()=>{}', 'Callback for change state'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Switch</h1>

        <p className={'text-leader2'}>
          Create a switch styled checkbox with support for highly used options.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <h4>Variant 1</h4>
              <div>
                <ui-switch />
                <ui-switch checked />
                <ui-switch caption='Switch' />
                <div>
                  <ui-switch disabled />
                  <ui-switch checked disabled />
                  <ui-switch caption='Switch' disabled />
                </div>
              </div>
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <h4>Variant 2</h4>
              <div>
                <ui-switch variant={2} />
                <ui-switch checked variant={2} />
                <ui-switch caption='Switch' variant={2} />
                <div>
                  <ui-switch disabled variant={2} />
                  <ui-switch checked disabled variant={2} />
                  <ui-switch caption='Switch' disabled variant={2} />
                </div>
              </div>
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
