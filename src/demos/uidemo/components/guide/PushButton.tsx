import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

import '@fortawesome/fontawesome-free/css/all.css';

@CustomElement('guide-button')
export class GuideButton extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {Button} from "@nyaf/ui";`;
    const codeDefaultUse = `
            <ui-button title="Button">
            <ui-button>Button</Button>
        `;
    const codeAddIcon = `
            <ui-button icon='rocket'/>
            <ui-button icon='rocket' iconPrefix="fa fa-"/>
            <ui-button image='images/location.png'/>
        `;
    const codeAddBadge = `<ui-button icon="envelop" badge={10} clsBadge={'alert'}/>`;
    const codeSemanticUse = `<ui-button as='a' title='This is link' href='https://metroui.org.ua'/>`;

    const codeCLassesUse = `<ui-button title='Button' cls='alert' clsTitle='fg-yellow'/>`;

    const tablePropsData = [
      ['<code>as</code>', '<code>button</code>', 'Semantic element'],
      ['<code>title</code>', '', 'Button title'],
      ['<code>badge</code>', '<code>null</code>', 'Button badge value'],
      ['<code>icon</code>', '<code>null</code>', 'Button icon from icon font'],
      ['<code>iconPrefix</code>', '<code>mif-</code>', 'Button icon prefix'],
      ['<code>image</code>', '<code>null</code>', 'Button icon image'],
      ['<code>cls</code>', '', 'Button additional classes'],
      ['<code>className</code>', '', 'Button additional classes'],
      ['<code>classTitle</code>', '', 'Button additional classes for title'],
      ['<code>classIcon</code>', '', 'Button additional classes for icon'],
      ['<code>classBadge</code>', '', 'Button additional classes for badge'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Push button</h1>
        <p className='text-leader2'>
          With the Metro 4 you can easily create different types of stylized push buttons.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <div className='example'>
          <ui-button title='Button' />
                    &nbsp;<ui-button cls='alert' title='Button' />
                    &nbsp;<ui-button cls='info' title='Button' icon='rocket' />
                    &nbsp;<ui-button cls='warning' icon='bell' />
                    &nbsp;<ui-button as='a' cls='secondary' title='Link as Button' href='#' />
                    &nbsp;<ui-button as='span' cls='primary' title='Span as Button' />
                    &nbsp;<ui-button title='Flat Button' cls={'flat-button'} />
                    &nbsp;<ui-button icon='envelop' badge={10} clsBadge={'alert'} />
                    &nbsp;<ui-button title={<ui-icon name='rocket' />} badge={10} clsBadge={'alert'} />
        </div>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsData} />

        <br />
        <h3>Using</h3>

        <h5>Default</h5>
        <div className={'example'}>
          <ui-button title={'Button'} />
          &nbsp;<ui-button>Button</ui-button>
        </div>
        <demo-prismcode language='jsx' code={codeDefaultUse} />

        <h5>Create as anchor</h5>
        <div className={'example'}>
          <ui-button as='a' title='This is link' href='https://metroui.org.ua' />
        </div>
        <demo-prismcode language='jsx' code={codeSemanticUse} />

        <h5>Add icon</h5>
        <div className={'example'}>
          <ui-button icon={'rocket'} />
                    &nbsp;<ui-button icon='rocket' iconPrefix='fa fa-' />
                    &nbsp;<ui-button image='../images/location.png' />
        </div>
        <demo-prismcode language='jsx' code={codeAddIcon} />

        <h5>Add badge</h5>
        <div className={'example'}>
          <ui-button icon='envelop' badge={10} clsBadge={'alert'} />
        </div>
        <demo-prismcode language='jsx' code={codeAddBadge} />

        <h5>Use classes</h5>
        <div className='example'>
          <ui-button title='Button' cls='alert' clsTitle='fg-yellow' />
        </div>
        <demo-prismcode language='jsx' code={codeCLassesUse} />

        <br />

        <br />
      </demo-article>
    );
  }
}
