import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-checkbox')
export class GuideCheckbox extends BaseComponent<{}> {
  render() {
    const codeImport = `import { Checkbox } from "@nyaf/ui";`;
    const codeUsing = `
            <ui-checkbox/>
            <ui-checkbox checked/>
            <ui-checkbox caption='Checkbox'/>

            <ui-checkbox variant={2}/>
            <ui-checkbox checked variant={2}/>
            <ui-checkbox caption='Checkbox' variant={2}/>

            <ui-checkbox caption='Checkbox' disabled/>
            <ui-checkbox caption='Checkbox' readOnly={true}/>
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
        <h1>Checkbox</h1>

        <p className={'text-leader2'}>
          Create a styled checkbox with support for highly used options.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <h4>Variant 1</h4>
              <div>
                <ui-checkbox />
                <ui-checkbox checked />
                <ui-checkbox caption='Checkbox' />
                <div>
                  <ui-checkbox disabled />
                  <ui-checkbox checked disabled />
                  <ui-checkbox caption='Checkbox' disabled />
                </div>
              </div>
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <h4>Variant 2</h4>
              <div>
                <ui-checkbox variant={2} />
                <ui-checkbox checked variant={2} />
                <ui-checkbox caption='Checkbox' variant={2} />
                <div>
                  <ui-checkbox disabled variant={2} />
                  <ui-checkbox checked disabled variant={2} />
                  <ui-checkbox caption='Checkbox' disabled variant={2} />
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
