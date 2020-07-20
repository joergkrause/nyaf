import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import {tablePropsHeader} from '../Defs';

@CustomElement('guide-selecticon')
export class GuideSelectIcon extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {SelectIcon} from "@nyaf/ui";`;
    const codeUsing = `<ui-selecticon source="/data/font.svg"/>`;

    const tablePropsBody = [];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>SelectIcon</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-sm-3'>
              <ui-selecticon source='/data/metro.svg' />
            </ui-cell>
            <ui-cell cls='cell-sm-3'>
              <ui-selecticon source='/data/fa.svg' viewBoxWidth={512} viewBoxHeight={448} />
            </ui-cell>
            <ui-cell cls='cell-sm-3'>
              <ui-selecticon source='/data/icofont.svg' viewBoxWidth={1000} viewBoxHeight={850} />
            </ui-cell>
            <ui-cell cls='cell-sm-3'>
              <ui-selecticon source='/data/fa.svg' viewBoxWidth={512} viewBoxHeight={448} nameInCaption={false} nameInItem={false} />
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
