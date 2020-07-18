import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('guide-breadcrumbs')
export class GuideBreadcrumbs extends BaseComponent<{}> {
  render() {
    const codeImport = `import {Breadcrumbs, BreadcrumbsItem} from "metro4-react";`;
    const codeUsing = `
            <Breadcrumbs>
                <BreadcrumbsItem href="/home">Home</BreadcrumbsItem>
                <BreadcrumbsItem href="/products">Products</BreadcrumbsItem>
                <BreadcrumbsItem href="download">Download</BreadcrumbsItem>
                <BreadcrumbsItem>Windows 10</BreadcrumbsItem>
            </Breadcrumbs>
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
        <h1>Breadcrumbs</h1>

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
        <Table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBody} />

        <br />
        <h4>Item Props</h4>
        <Table className='table-border cell-border' head={tablePropsHeader} body={tablePropsBodyItem} />
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
