import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-selectcolor')
export class GuideSelectColor extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {SelectColor} from "metro4-react";`;
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
          <Row>
            <Cell cls="cell-sm-5">
              <SelectColor source={Color.colorListMetro} prepend="Color: " />
            </Cell>
            <Cell cls="cell-sm-5">
              <SelectColor source={Color.colorListStandard} append="your color" />
            </Cell>
            <Cell cls="cell-sm-2">
              <SelectColor filter={false} value="#008000" showColorName={false} prepend={<Icon name="palette" />} >
                <option value="#ff0000">red</option>
                <option value="#008000">green</option>
                <option value="#0000ff">blue</option>
              </SelectColor>
            </Cell>
          </Row>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language="js" code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language="js" code={codeUsing} />
        <demo-prismcode language="js" code={codeUsing2} />

        <br />
        <h4>Props</h4>
        <Table className="table-border cell-border" head={tablePropsHeader} body={tablePropsBody} />

        <br />

        <br />
      </demo-article>
    )
  }
}