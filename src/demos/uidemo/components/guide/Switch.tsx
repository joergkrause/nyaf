import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-switch')
export class GuideSwitch extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {Switch} from "metro4-react";`;
    const codeUsing = `
            <Switch/>
            <Switch checked/>
            <Switch caption='Switch'/>

            <Switch variant={2}/>
            <Switch checked variant={2}/>
            <Switch caption='Switch' variant={2}/>

            <Switch caption='Switch' disabled/>
            <Switch caption='Switch' readOnly={true}/>
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
          <Row>
            <Cell cls='cell-md-6'>
              <h4>Variant 1</h4>
              <div>
                <Switch />
                <Switch checked />
                <Switch caption='Switch' />
                <div>
                  <Switch disabled />
                  <Switch checked disabled />
                  <Switch caption='Switch' disabled />
                </div>
              </div>
            </Cell>
            <Cell cls='cell-md-6'>
              <h4>Variant 2</h4>
              <div>
                <Switch variant={2} />
                <Switch checked variant={2} />
                <Switch caption='Switch' variant={2} />
                <div>
                  <Switch disabled variant={2} />
                  <Switch checked disabled variant={2} />
                  <Switch caption='Switch' disabled variant={2} />
                </div>
              </div>
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