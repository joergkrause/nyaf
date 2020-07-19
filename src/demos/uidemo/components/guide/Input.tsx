import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-input')
export class GuideInput extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const autocompleteList = ['Ukraine', 'USA', 'Canada', 'Marokko', 'Singapur'];
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

    const codeImport = `import {Input} from "@nyaf/ui";`;
    const codeUsing = `
            <ui-input placeholder='Input value' value={123}/>
            <ui-input placeholder='Search...' search={true} onSearch={ val => console.log(val) } />
            <ui-input autocomplete={["Value 1", "Value 2", "Value 3", "Value 4"]} />
            <ui-input fieldState={'error'} errorMessage={'Enter a valid value'}/>
            <ui-input value='Input value' append={<Icon name='rocket'/>}/>
            <ui-input value='Input value' prepend='Prepend:'/>
        `;

    const tablePropsBody = [
      ['placeholder', 'empty', 'Input placeholder'],
      ['fieldState', 'normal', 'Field state: normal, error, success'],
      ['errorMessage', 'null', 'Error message for invalid input'],
      ['value', 'empty', 'Input initial value'],
      ['type', 'text', 'Field type, can be all of supported text types'],
      ['append', 'null', 'Field append data'],
      ['prepend', 'null', 'Field prepend data'],
      ['clear', 'true', 'Show clear button'],
      ['reveal', 'true', 'Show reveal button for password input'],
      ['search', 'true', 'Show search button'],
      ['searchType', 'custom', 'Search type: <code>custom</code>, <code>submit</code>'],
      ['history', 'false', 'History feature'],
      ['preventSubmit', 'true', 'When true and history, enter press prevented submit'],
      ['autocomplete', '[]', 'Array with autocomplete values'],
      ['autocompleteHeight', '200', 'Autocomplete dropdown list height'],
      ['customButtons', '[]', 'Array of custom buttons'],
      ['cls', 'null', 'Additional classes for input component'],
      ['className', 'null', 'Additional classes for input element'],
      ['clsAppend', 'null', 'Additional classes for append data'],
      ['clsPrepend', 'null', 'Additional classes for prepend data'],
      ['clsButtonGroup', 'null', 'Additional classes button group'],
      ['clsCustomButton', 'null', 'Additional classes custom buttons'],
      ['clsClearButton', 'null', 'Additional classes clear button'],
      ['clsRevealButton', 'null', 'Additional classes reveal button'],
      ['clsSearchButton', 'null', 'Additional classes search button'],
      ['clsAutocomplete', 'null', 'Additional classes for autocomplete list'],
      ['clsAutocompleteItem', 'null', 'Additional classes for autocomplete list item'],
      ['clsErrorMessage', 'null', 'Additional classes for error message'],
      ['onSearch', '()=>{}', 'Callback for search button click event'],
      ['onClear', '()=>{}', 'Callback for clear button click'],
      ['onReveal', '()=>{}', 'Callback for reveal button click'],
      ['onChange', '()=>{}', 'Callback for input change event'],
      ['onKeyUp', '()=>{}', 'Callback for input keyup event'],
      ['onBlur', '()=>{}', 'Callback for input blur'],
      ['onFocus', '()=>{}', 'Callback for input focus'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Input</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <p>
          Use <code>Input</code> component to create form text input element.
                </p>
        <demo-example>
          <ui-row>
            <ui-cell cls='cell-md-4'>
              <h6>default</h6>
              <ui-input placeholder='Input value' value={123} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>password</h6>
              <ui-input placeholder='Enter a password' type='password' />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>search</h6>
              <ui-input placeholder='Search...' search={true} onSearch={val => console.log(val)} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4'>
              <h6>history</h6>
              <ui-input history={true} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>autocomplete</h6>
              <ui-input autocomplete={autocompleteList} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h5>custom buttons</h5>
              <ui-input customButtons={customButtons} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-4'>
              <h6>state required</h6>
              <ui-input cls={'required'} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>state error</h6>
              <ui-input fieldState={'error'} errorMessage={'Enter a valid value'} />
            </ui-cell>
            <ui-cell cls='cell-md-4'>
              <h6>state success</h6>
              <ui-input fieldState={'success'} />
            </ui-cell>
          </ui-row>

          <ui-row>
            <ui-cell cls='cell-md-6'>
              <h6>prepend</h6>
              <ui-input value='Input value' prepend='Prepend:' />
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <h6>prepend icon</h6>
              <ui-input value='Input value' prepend={<ui-icon name='rocket' />} />
            </ui-cell>
          </ui-row>
          <ui-row>
            <ui-cell cls='cell-md-6'>
              <h6>append</h6>
              <ui-input value='Input value' append='%' />
            </ui-cell>
            <ui-cell cls='cell-md-6'>
              <h6>append icon</h6>
              <ui-input value='Input value' append={<ui-icon name='rocket' />} />
            </ui-cell>
          </ui-row>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBody} />

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUsing} />

        <br />

        <br />
      </demo-article>
    );
  }
}
