import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-template')
export class GuideTemplate extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {Component} from "metro4-react";`;
    const codeUsing = ``;

    const tablePropsBody = [];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Title</h1>

        <p className={'text-leader2'}>
          ...
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          ...
                </p>

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