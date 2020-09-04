import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import {tablePropsHeader} from '../Defs';

@CustomElement('guide-breadcrumbs')
export class GuideBreadCrumbs extends BaseComponent<{}> {
  render() {
    const codeImport = `import {<ui-breadcrumbs, <ui-breadcrumbsItem} from "@nyaf/ui";`;
    const codeUsing = `
            <<ui-breadcrumbs>
                <<ui-breadcrumb-item href="/home">Home</<ui-breadcrumb-item>
                <<ui-breadcrumb-item href="/products">Products</<ui-breadcrumb-item>
                <<ui-breadcrumb-item href="download">Download</<ui-breadcrumb-item>
                <<ui-breadcrumb-item>Windows 10</<ui-breadcrumb-item>
            </<ui-breadcrumbs>
        `;

    const codeItemStructure = `
            <li className={classItem}>
                <a className={classLink} {...rest}>
                    {this.props.children}
                </a>
            </li>
        `;

    const tablePropsBody = [
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['clsItem', 'null', 'Additional classes for page item'],
      ['clsLink', 'null', 'Additional classes for page link'],
    ];
    const tablePropsBodyItem = [
      ['cls', 'null', 'Additional classes for component'],
      ['className', 'null', 'Additional classes for component'],
      ['clsItem', 'null', 'Additional classes for page item'],
      ['clsLink', 'null', 'Additional classes for page link'],
    ];

    return (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>BreadcCrumbs</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-breadcrumbs>
            <ui-breadcrumbs-item>Home</ui-breadcrumbs-item>
            <ui-breadcrumbs-item>Products</ui-breadcrumbs-item>
            <ui-breadcrumbs-item>Download</ui-breadcrumbs-item>
            <ui-breadcrumbs-item>Windows 10</ui-breadcrumbs-item>
          </ui-breadcrumbs>
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
        <h4>Item Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBodyItem} />
        <p>
          In additional, you can use all valid props for <code>&lt;a&gt;</code> - such as <code>href</code>, <code>target</code>, etc.
                </p>

        <br />
        <h4>Item structure</h4>
        <demo-prismcode language='js' code={codeItemStructure} />

        <br />
      </demo-article>
    );
  }
}
