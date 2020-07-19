import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-table')
export class GuideTable extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {Table} from "@nyaf/ui";`;
    const codeUseDirectly = `
            <ui-table cls="table">
                <thead>
                    <tr>
                        <td>...</td>
                        ...
                        <td>...</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>...</td>
                        ...
                        <td>...</td>
                    </tr>
                </tbody>
            </ui-table>
        `;
    const codeUseArray = `
            const tablePropsHeader = [
                {
                    name: "prop",
                    title: "Property",
                    template: "<code>%VAL%</code>"
                },
                {
                    name: "defValue",
                    title: "Default Value",
                },
                {
                    name: "desc",
                    title: "Description",
                },
            ];

            const tablePropsData = [
                ["mode", "normal", "Table mode: normal, static. When static, sortable classes will not be drawn."],
                ["head", "null", "Table head. This is a array of table head cells"],
                ["body", "null", "Table body. This is a array of table body cells"],
                ["cls", "", "Table classes"],
                ["className", "", "Table classes"],
                ["clsHeadRow", "", "Table classes for head row"],
                ["clsHeadCell", "", "Table classes for head cell"],
                ["clsBodyRow", "", "Table classes for body row"],
                ["clsBodyCell", "", "Table classes for body cell"],
                ["onHeadClick", "", "Callback for head cell click event"],
                ["onCellClick", "", "Callback for body cell click event"],
                ["onDrawCell", "", "Callback for body cell draw event"],
            ];

            <ui-table head={tablePropsHeader} body={tablePropsData} className="table-border cell-border"/>
        `;

    const codeUseArrayForBody = `
        [
            ["clsHeadRow", "empty", "Table classes for head row"],
            ["clsHeadCell", "empty", "Table classes for head cell"],
            ["clsBodyRow", "empty", "Table classes for body row"],
            ["clsBodyCell", "empty", "Table classes for body cell"],
            ["onHeadClick", "()=>{}", "Callback for head cell click event"],
            ["onCellClick", "()=>{}", "Callback for body cell click event"]
        ]`;

    const tablePropsData = [
      ["mode", "normal", "Table mode: <code>normal</code>, <code>static</code>. When static, sortable classes will not be drawn."],
      ["head", "null", "Table head. This is a array of table head cells"],
      ["body", "null", "Table body. This is a array of table body cells"],
      ["cls, className", "empty", "Table classes"],
      ["clsHeadRow", "empty", "Table classes for head row"],
      ["clsHeadCell", "empty", "Table classes for head cell"],
      ["clsBodyRow", "empty", "Table classes for body row"],
      ["clsBodyCell", "empty", "Table classes for body cell"],
      ["onHeadClick", "()=>{}", "Callback for head cell click event"],
      ["onCellClick", "()=>{}", "Callback for body cell click event"],
      ["onDrawCell", "()=>{}", "Callback for body cell draw event"],
    ];

    const tableDefineHeadProps = [
      ["name", "Field name"],
      ["title", "Field caption"],
      ["sortable", "The field can participate in sorting."],
      ["sortDir", "Sort direction: asc, desc"],
      ["cls", "Additional classes for head cell"],
      ["clsColumn", "Additional classes for body cell"],
      ["size", "Fixed size for body cell"],
      ["format", "Body cell data format: date, number, int, float, money, card, phone. This field used in extended components such as <code>&lt;MemoryTable/&gt;</code>"],
      ["formatMask", "Format mask template for data manipulate when sort"],
      ["thousandSeparator", "Separator for divide thousands, default is <code>,</code>"],
      ["decimalSeparator", "Separator for divide decimal part, default is <code>.</code>"],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Table</h1>

        <p className={'text-leader2'}>
          You can draw table from array or directly.
                </p>

        <br />

        <br />

        <h3>Importing</h3>
        <demo-prismcode language="js" code={codeImport} />

        <br />
        <h4>Props</h4>
        <ui-table head={tablePropsHeader} body={tablePropsData} className="table-border cell-border" />

        <br />
        <h3>Using</h3>
        <p>
          You can add data to the table either directly, using the table layout or from arrays using special props tables.
                </p>

        <br />
        <h4>Directly</h4>
        <demo-prismcode language="js" code={codeUseDirectly} />

        <br />
        <h4>Data from array</h4>
        <p>
          When you add data to table from arrays, you can define two arrays: <code>head</code> and <code>body</code>.
                </p>
        <demo-prismcode language="js" code={codeUseArray} />

        <br />
        <h4>Define table head with array</h4>
        <p>When you define table head from array, you can use next props:</p>
        <ui-table className="table-border cell-border" body={tableDefineHeadProps} onDrawCell={(val, props, index) => index === 0 ? "<code>" + val + "</code>" : val} />

        <br />
        <h4>Define table body with array</h4>
        <p>Each item must be an array of values.</p>
        <demo-prismcode language="js" code={codeUseArrayForBody} />

        <br />

        <br />
      </demo-article>
    )
  }
}