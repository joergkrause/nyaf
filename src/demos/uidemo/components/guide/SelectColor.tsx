import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import {tablePropsHeader} from '../Defs';
import { Color } from '@nyaf/ui';

@CustomElement('guide-selectcolor')
export class GuideSelectColor extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {SelectColor} from "@nyaf/ui";`;
    const codeUsing = `<SelectColor source={Color.colorListMetro} prepend="Color: "/>`;
    const codeUsing2 = `
            <SelectColor filter={false} value="#008000" colorNameInCaption={false}>
                <option value="#ff0000">red</option>
                <option value="#008000">green</option>
                <option value="#0000ff">blue</option>
            </SelectColor>
        `;

    const tablePropsBody = [];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>SelectColor</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-sm-5'>
              <ui-selectcolor source={Color.colorListMetro} prepend='Color: ' />
            </ui-cell>
            <ui-cell cls='cell-sm-5'>
              <ui-selectcolor source={Color.colorListStandard} append='your color' />
            </ui-cell>
            <ui-cell cls='cell-sm-2'>
              <ui-selectcolor filter={false} value='#008000' showColorName={false} prepend={<ui-icon name='palette' />} >
                <option value='#ff0000'>red</option>
                <option value='#008000'>green</option>
                <option value='#0000ff'>blue</option>
              </ui-selectcolor>
            </ui-cell>
          </ui-row>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUsing} />
        <demo-prismcode language='js' code={codeUsing2} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBody} />

        <br />

        <br />
      </demo-article>
    );
  }
}
