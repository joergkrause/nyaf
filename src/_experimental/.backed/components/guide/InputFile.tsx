import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-inoutfile')
export class GuideInputFile extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import { InputFile } from "@nyaf/ui";`;
    const codeUsing = `
            <ui-inputfile/>
            <ui-inputfile buttonIcon={'folder'} buttonTitle={''}/>
            <ui-inputfile buttonIcon={'folder'} buttonTitle={''} customButtons={customButtons} multiple={true}/>
            <ui-inputfile mode={'drop'} multiple={true}/>
        `;

    const customButtons = [
      {
        title: '',
        icon: 'apple',
        image: '',
        cls: 'info',
        onClick: () => { alert('info!'); }
      },
      {
        title: '',
        icon: 'rocket',
        iconPrefix: 'fa fa-',
        image: '',
        cls: 'alert',
        onClick: () => { alert('halo!'); }
      }
    ];

    const tablePropsBody = [
      ['mode', 'input', 'Input file mode: <code>input</code> or <code>drop</code>'],
      ['buttonIcon', 'null', 'Button icon name'],
      ['buttonIconPrefix', 'mif-', 'Button icon name prefix'],
      ['buttonTitle', 'Choose file(s)', 'Button title (it is default)'],
      ['dropIcon', 'null', 'Drop mode icon name'],
      ['dropIconPrefix', 'mif-', 'Drop mode icon name prefix'],
      ['dropIconSize', '1x', 'Drop mode icon size. For Metro icon font can be from 1x to 10x'],
      ['dropTitle', '<strong>Choose a file(s)</strong> or drop it here', 'Drop mode main title'],
      ['dropTitleSecondary', 'file(s) selected', 'Drop mode main secondary title'],
      ['append', 'null', 'Append data'],
      ['prepend', 'null', 'Prepend data'],
      ['clear', 'true', 'Show clear button'],
      ['select', 'true', 'Show select button'],
      ['customButtons', '[]', 'Array of custom buttons'],
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['clsCaption', 'null', 'Additional classes caption (select file names)'],
      ['clsAppend', 'null', 'Additional classes for append'],
      ['clsPrepend', 'null', 'Additional classes for prepend'],
      ['clsButtonGroup', 'null', 'Additional classes for custom buttons container'],
      ['clsCustomButton', 'null', 'Additional classes for custom buttons'],
      ['clsClearButton', 'null', 'Additional classes for clear button'],
      ['clsSelectButton', 'null', 'Additional classes for select button'],
      ['onClear', '()=>{}', 'Callback for clear event'],
      ['onChange', '()=>{}', 'Callback for change event'],
      ['onFocus', '()=>{}', 'Callback for focus event'],
      ['onBlur', '()=>{}', 'Callback for blur event'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>InputFile</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-row>
            <ui-cell cls={'cell-md-4'}>
              <ui-inputfile />
            </ui-cell>

            <ui-cell cls={'cell-md-4'}>
              <ui-inputfile buttonIcon={'folder'} buttonTitle={''} />
            </ui-cell>

            <ui-cell cls={'cell-md-4'}>
              <ui-inputfile buttonIcon={'folder'} buttonTitle={''} customButtons={customButtons} multiple={true} />
            </ui-cell>
          </ui-row>
          <br />
          <ui-row>
            <ui-cell cls={'cell-md-12'}>
              <ui-inputfile mode={'drop'} multiple={true} />
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
