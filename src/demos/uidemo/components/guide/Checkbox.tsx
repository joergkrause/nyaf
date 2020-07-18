import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-checkbox')
export class GuideCheckbox extends BaseComponent<{}> {
  render() {
    const codeImport = `import {Checkbox} from "metro4-react";`;
    const codeUsing = `
            <Checkbox/>
            <Checkbox checked/>
            <Checkbox caption='Checkbox'/>

            <Checkbox variant={2}/>
            <Checkbox checked variant={2}/>
            <Checkbox caption='Checkbox' variant={2}/>

            <Checkbox caption='Checkbox' disabled/>
            <Checkbox caption='Checkbox' readOnly={true}/>
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
          <Row>
            <Cell cls='cell-md-6'>
              <h4>Variant 1</h4>
              <div>
                <Checkbox />
                <Checkbox checked />
                <Checkbox caption='Checkbox' />
                <div>
                  <Checkbox disabled />
                  <Checkbox checked disabled />
                  <Checkbox caption='Checkbox' disabled />
                </div>
              </div>
            </Cell>
            <Cell cls='cell-md-6'>
              <h4>Variant 2</h4>
              <div>
                <Checkbox variant={2} />
                <Checkbox checked variant={2} />
                <Checkbox caption='Checkbox' variant={2} />
                <div>
                  <Checkbox disabled variant={2} />
                  <Checkbox checked disabled variant={2} />
                  <Checkbox caption='Checkbox' disabled variant={2} />
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