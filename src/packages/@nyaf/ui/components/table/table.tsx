import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./table.scss');
import { MD5 } from '../../routines';
import { IModel, ModelBinder } from '@nyaf/forms';

class TableModel {
  body: any;
  bodyHash: string;
}

@CustomElement('ui-table')
@Properties<TableProps>({
  emptyTitle: 'Nothing to show',
  mode: 'normal',
  head: null,
  body: null,
  cls: '',
  className: '',
  clsHeadRow: '',
  clsHeadCell: '',
  clsBodyRow: '',
  clsBodyCell: '',
  clsEmptyTitle: '',
})
@Events([
  'headclick',
  'cellclick',
  'drawcell'
])
export class Table extends BaseComponent<TableProps> implements IModel<TableModel> {

  header: any;
  table: any;

  constructor() {
    super();
    this.model.scope.body = this.data.body;
    this.model.scope.bodyHash = MD5(JSON.stringify(this.data.body));
    this.header = null;
    this.table = null;
  }

  model: ModelBinder<TableModel>;

  static getDerivedStateFromProps(props, state) {
    if (MD5(JSON.stringify(props.body)) !== state.bodyHash) {
      return {
        bodyHash: MD5(JSON.stringify(props.body)),
        body: props.body
      };
    }
    return null;
  }

  drawHeader() {
    const { head, mode, clsHeadRow, clsHeadCell } = this.data;

    if (Array.isArray(head) && head.length > 0) {
      return (
        <tr className={clsHeadRow}>
          {head.map((el, index) => {
            const { sortable, sortDir, title, name, cls } = el;
            const sortClass = mode !== 'static' ? `${sortable ? 'sortable-column' : ''} ${sortDir ? 'sort-' + sortDir : ''}` : '';
            const headClass = cls ? cls : '';
            return (
              <th
                index={index}
                key={index}
                className={`${sortClass} ${clsHeadCell} ${headClass}`}
                onClick={this.headClick}>
                {title ? title : name}
              </th>
            );
          })}
        </tr>
      );
    }
  }

  drawBody() {
    const { emptyTitle, head, clsBodyRow, clsBodyCell, clsEmptyTitle } = this.data;
    const { body } = this.state;
    const tableBody = [];
    const colSpan = head ? head.length : 1;

    if (!Array.isArray(body) || body.length === 0) {
      tableBody.push(
        <tr className={clsBodyRow} key={0}>
          <td colSpan={colSpan} className={clsEmptyTitle}>{emptyTitle}</td>
        </tr>
      );
    } else {
      body.forEach((el, index) => {
        tableBody.push(
          <tr key={index} className={clsBodyRow}>
            {el.map((val, key) => {
              const colProps = this.props.head ? this.props.head[key] : null;
              const cellClass = `${clsBodyCell} ${colProps && colProps['clsColumn'] ? colProps['clsColumn'] : ''}`;
              const hasTemplate = colProps && colProps['template'];
              let cellVal = hasTemplate ? colProps['template'].replace('%VAL%', val) : val;
              const style = {};

              if (colProps && colProps['size']) {
                style.width = colProps['size'];
              }

              cellVal = onDrawCell(cellVal, colProps, key);

              return hasTemplate ?
                <td key={key} className={cellClass} onClick={this.cellClick} style={style} dangerouslySetInnerHTML={{ __html: cellVal }} /> :
                <td key={key} className={cellClass} onClick={this.cellClick} style={style}>{cellVal}</td>;
            })}
          </tr>
        );
      });
    }

    return tableBody;
  }

  headClick(e) {
    this.dispatch('headclick', e);
  }

  cellClick(e) {
    this.dispatch('cellclick', e);
  }

  async render() {
    const {
      emptyTitle, clsEmptyTitle, body: initBody, head, cls, className, mode, clsHeadRow, clsHeadCell, clsBodyRow, clsBodyCell
      ...rest } = this.data;
    const { body } = this.model.scope;
    const classTable = `table ${cls} ${className}`;

    return (
      <table className={classTable} {...rest} ref={ref => this.table = ref}>
        {head && (
          <thead>{this.drawHeader()}</thead>
        )}
        {body && (
          <tbody>{this.drawBody()}</tbody>
        )}
        {this.children}
      </table>
    );
  }
}

interface TableProps {
  emptyTitle: string;
  mode: 'normal';
  head: any[];
  body: null;
  cls: string;
  className: string;
  clsHeadRow: string;
  clsHeadCell: string;
  clsBodyRow: string;
  clsBodyCell: string;
  clsEmptyTitle: string;
}
