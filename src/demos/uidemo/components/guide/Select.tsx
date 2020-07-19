import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-select')
export class GuideSelect extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {Select} from "@nyaf/ui";`;
    const codeUsing = `
        <ui-select>
            <option value="1">Item 1</option>
            ...
            <option value="2">Item 2</option>
        </ui-select>`;
    const codeUsingWithObject = `
            const options = {
                "red": "#ff0000",
                "green": "#008000",
                "blue": "0000ff"
            };

            <ui-select source={options}/>
        `;

    const tablePropsBody = [];

    const demoOptions = {
      'red': '#ff0000',
      'green': '#008000',
      'blue': '0000ff'
    };

    return await (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Select</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-sm-6'>
              <ui-select>
                <option value='#ff0000'>red</option>
                <option value='#008000'>green</option>
                <option value='#0000ff'>blue</option>
              </ui-select>
            </ui-cell>
            <ui-cell cls='cell-sm-6'>
              <ui-select source={demoOptions} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-sm-6'>
              <ui-select prepend='Select color: ' source={demoOptions} />
            </ui-cell>
            <ui-cell cls='cell-sm-6'>
              <ui-select append='Your color' source={demoOptions} />
            </ui-cell>
          </ui-row>
          <ui-row>
            <ui-cell cls='cell-sm-6'>
              <ui-select prepend={<ui-icon name='rocket' />} source={demoOptions} />
            </ui-cell>
            <ui-cell cls='cell-sm-6'>
              <ui-select append={<ui-icon name='palette' />} source={demoOptions} />
            </ui-cell>
          </ui-row>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUsing} />
        <demo-prismcode language='js' code={codeUsingWithObject} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBody} />

        <br />

        <br />
      </demo-article>
    );
  }
}
