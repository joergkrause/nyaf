import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { tablePropsHeader } from '../Defs';

@CustomElement('guide-imagebutton')
export class GuideImageButton extends BaseComponent<{}> {
  constructor() {
    super();
  }
  async render() {
    const codeImport = `import {ImageButton} from "@nyaf/ui";`;
    const codeUse1 = `<ui-imagebutton icon="share" title="Share your connect"/>`;
    const codeUse2 = `
            <ui-imagebutton
                icon="share"
                title="Share your connect"
                cls="icon-right info"/>`;
    const codeUse3 = `
            <ui-imagebutton as="a"
                icon="rocket"
                title="This is a link"
                className={'alert fg-white'}/>`;
    const codeUse4 = `
            <ui-imagebutton className='success'>
                <Icon name="rocket" prefix="fa fa-" cls="icon"/>
                <span className="caption">Image button</span>
            </ImageButton>
        `;

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Image button</h1>

        <p className={'text-leader2'}>
          Need windows image button? Use Metro 4 &lt;ImageButton/&gt; component.
                </p>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-imagebutton icon='share' title='Share your connect' />
          &nbsp;<ui-imagebutton icon='share' title='Share your connect' cls='icon-right info' />
          &nbsp;<ui-imagebutton as='a' icon='rocket' title='This is a link' className={'alert fg-white'} />
          &nbsp;<ui-imagebutton className='success'><ui-icon name='rocket' prefix='fa fa-' cls='icon' /> <span className='caption'>Image button</span></ui-imagebutton>
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader}>
          <tbody>
            <tr>
              <td><code>as</code></td>
              <td><code>button</code></td>
              <td>Semantic element</td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td></td>
              <td>Button title</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td></td>
              <td>Button icon from icon font</td>
            </tr>
            <tr>
              <td><code>iconPrefix</code></td>
              <td><code>mif-</code></td>
              <td>Button icon prefix for icon from icon font</td>
            </tr>
            <tr>
              <td><code>image</code></td>
              <td></td>
              <td>Source for button image</td>
            </tr>
            <tr>
              <td><code>cls</code>, <code>className</code></td>
              <td></td>
              <td>Button classes</td>
            </tr>
            <tr>
              <td><code>clsTitle</code></td>
              <td></td>
              <td>Button class for title (when use prop title)</td>
            </tr>
            <tr>
              <td><code>clsIcon</code></td>
              <td></td>
              <td>Button class for icon or image</td>
            </tr>
          </tbody>
        </ui-table>

        <br />
        <h3>Using</h3>
        <demo-prismcode language='js' code={codeUse1} />
        <demo-prismcode language='js' code={codeUse2} />
        <demo-prismcode language='js' code={codeUse3} />
        <demo-prismcode language='js' code={codeUse4} />

        <br />

        <br />
      </demo-article>
    );
  }
}
