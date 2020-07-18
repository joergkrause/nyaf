import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-selecticon')
export class GuideSelectIcon extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {SelectIcon} from "metro4-react";`;
    const codeUsing = `<SelectIcon source="/data/font.svg"/>`;

    const tablePropsBody = [];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>SelectIcon</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <Row>
            <Cell cls="cell-sm-3">
              <SelectIcon source="/data/metro.svg" />
            </Cell>
            <Cell cls="cell-sm-3">
              <SelectIcon source="/data/fa.svg" viewBoxWidth={512} viewBoxHeight={448} />
            </Cell>
            <Cell cls="cell-sm-3">
              <SelectIcon source="/data/icofont.svg" viewBoxWidth={1000} viewBoxHeight={850} />
            </Cell>
            <Cell cls="cell-sm-3">
              <SelectIcon source="/data/fa.svg" viewBoxWidth={512} viewBoxHeight={448} nameInCaption={false} nameInItem={false} />
            </Cell>
          </Row>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language="js" code={codeImport} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language="js" code={codeUsing} />

        <br />
        <h4>Props</h4>
        <Table className="table-border cell-border" head={tablePropsHeader} body={tablePropsBody} />

        <br />

        <br />
      </demo-article>
    )
  }
}