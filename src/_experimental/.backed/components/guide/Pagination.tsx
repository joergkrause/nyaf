import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import Defs, { tablePropsHeader } from '../Defs';

@CustomElement('guide-pagination')
export class GuidePagination extends BaseComponent<{}> {

  constructor() {
    super();
  }

  paginationClick() {
    alert('clicked');
  }

  async render() {
    const codeImport = `import {Pagination} from "@nyaf/ui";`;
    const codeUse = `<ui-pagination total={100} itemsPerPage={5} current={7} onClick=${Defs.OPEN_BRACE} (e) => {...} ${Defs.CLOSE_BRACE}/>`;
    const tablePropsData = [
      ['total', '0', 'Total records in set'],
      ['itemPerPage', '0', 'How much item sowed on the page'],
      ['current', '0', 'Current page number (from 1)'],
      ['distance', '5', 'Page distance'],
      ['cls', 'null', 'Pagination classes'],
      ['className', 'null', 'Pagination classes'],
      ['prevTitle', 'Prev', 'Previous button title'],
      ['nextTitle', 'Next', 'Next button title'],
      ['moreTitle', '...', 'More title'],
      ['onClick', '() => {}', 'Callback for pagination button click event. Function receive <code>page number</code> or <code>next</code>, <code>prev</code>']
    ];

    return await (
      <demo-article>
        <demo-guidelogo></demo-guidelogo>
        <h1>Pagination</h1>

        <br />

        <br />

        <h3>Introduction</h3>
        <demo-example>
          <ui-pagination total={100} itemsPerPage={5} current={7} n-on-click={this.paginationClick} />
          <ui-pagination total={100} itemsPerPage={5} current={7} n-on-click={this.paginationClick} className='no-gap info' />
          <ui-pagination total={100} itemsPerPage={5} current={7} n-on-click={this.paginationClick} className='size-small warning rounded' />
        </demo-example>

        <br />
        <h3>Importing</h3>
        <demo-prismcode language='js' code={codeImport} />

        <br />
        <h4>Props</h4>
        <ui-table className='table-border cell-border' head={tablePropsHeader} body={tablePropsData} />

        <br />
        <h3>Use</h3>
        <demo-prismcode language='js' code={codeUse} />

        <br />

        <br />
      </demo-article>
    );
  }
}
