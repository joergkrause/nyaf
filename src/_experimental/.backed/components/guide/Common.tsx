import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import { METRO_OFF_SITE } from '../Defs';

const codeImportCommon = `import {Common} '@nyaf/ui';`;

@CustomElement('guide-common')
export class GuideCommon extends BaseComponent<{}> {

  constructor() {
    super();
  }
  async render() {
    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Common styles</h1>

        <div className={'text-leader2'}>
          Common styles contains reset rules, base css rules, flex model classes, position and sizing classes, typography and other general rules.
                </div>

        <br />

        <br />

        <h3>Importing</h3>
        <p>
          For correct displaying Metro 4 Components, you should before using components, import <code>common styles</code>.
                </p>
        <demo-prismcode language={'javascript'} code={codeImportCommon} />

        <h5>Module content:</h5>
        <ul>
          <li>animation.less - element animations</li>
          <li>accent-colors.less - classes for set accent colors (alert, warning, success, ...)</li>
          <li>border.less - border defines</li>
          <li>cursors.less - cursors defines</li>
          <li>default-icons.less - default icons for components</li>
          <li>display.less - variants for display css property</li>
          <li>embed.less - classes for embed objects: iframe, object, embed, video and embed container</li>
          <li>flex.less - Metro 4 flex model</li>
          <li>float.less - classes for setup element floating</li>
          <li>ie.less - specific IE classes</li>
          <li>images.less - classes for using with images</li>
          <li>inputs.less - base classes for for inputs elements</li>
          <li>lists.less - classes for lists</li>
          <li>overlay.less - classes for overlay object</li>
          <li>position.less - classes for element positioning</li>
          <li>reset.less - classes for reset styles</li>
          <li>shadow.less - classes for set shadow to element</li>
          <li>sizing.less - classes for set element sizing (height, width)</li>
          <li>spacing.less - classes for set element spacing (padding, margin)</li>
          <li>typography.less - classes for setup elements typography</li>
          <li>utils.less - any utils classes (scroll, overflow, ...)</li>
        </ul>
        <p>
          Detailed description you can find in official <a href={METRO_OFF_SITE + 'animation.html'}>Metro 4 Documentation</a>.
        </p>

        <br />

        <br />
      </demo-article>
    )
  }
}