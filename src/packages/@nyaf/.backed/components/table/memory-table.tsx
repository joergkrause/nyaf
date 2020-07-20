import JSX, { CustomElement, Properties, BaseComponent, Events, LifeCycle } from '@nyaf/lib';
import { FetchStatus } from '../../defines';
import { IModel, ModelBinder } from '@nyaf/forms';
import { Utils } from '@nyaf/ui';

class MemoryTableModel {
  status: FetchStatus = FetchStatus.init;
  rows = 1;
  page = 1;
  total = 1;
  sortColumn = 0;
  sortDir: 'asc' | 'desc';
  searchFilter: any;
  message: string;
}

@CustomElement('ui-memorytable')
@Properties<MemoryTableProps>(
  {
    scrollable: false,
    source: null,
    pagination: true,
    search: true,
    info: true,
    infoTemplate: 'Showing $1 to $2 of $3 entries',
    rowsSteps: [-1, 10, 20, 100],
    rows: 10,
    rowsTitle: null,
    searchPlaceholder: 'Search...',
    searchFilter: '',
    searchFilterLength: 1,
    searchFilterThreshold: 500,
    clsSearchBlock: '',
    clsSearch: '',
    clsRows: '',
    clsInfoBlock: '',
    clsPagination: '',
    clsPaginationBlock: '',
    clsInfo: '',
  }
)
@Events([
  'headclick',
  'cellclick',
])
export class MemoryTable extends BaseComponent<MemoryTableProps> implements IModel<MemoryTableModel> {

  private head = null;
  private tableData = null;
  private table: HTMLTableElement;
  private searchThresholdTimer: any;
  private dataLength = 0;


  constructor() {
    super();

    this.head = null;
    this.tableData = null;
    this.searchThresholdTimer = false;
    this.dataLength = 0;

    this.model.scope.status = FetchStatus.init;
    this.model.scope.rows = this.data.rows;
    this.model.scope.page = 1;
    this.model.scope.sortColumn = 0;
    this.model.scope.sortDir = 'asc';
    this.model.scope.searchFilter = this.data.searchFilter;
  }
  model: ModelBinder<MemoryTableModel>;

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      const { source } = this.data;
      this.load(source);
    }
  }

  load(source: any) {
    if (source && typeof source === 'string') {
      fetch(source).then(
        (response) => response.json()
      ).then(
        (response) => {

          if (response.data) { this.tableData = response.data; }
          if (response.header) { this.head = response.header; }

          this.dataLength = this.tableData && Array.isArray(this.tableData) ? this.tableData.length : 0;

          this.model.scope.status = FetchStatus.ok;
        }
      ).catch((e) => {
        this.model.scope.status = FetchStatus.error;
        this.model.scope.message = e.message;
      });
    }
  }

  sliceData() {
    const { searchFilterLength } = this.tableData;
    const { page, rows, total, searchFilter } = this.model.scope;
    let data = [], workData;
    const start = +rows === -1 ? 0 : rows * (page - 1),
      stop = +rows === -1 ? total - 1 : start + rows - 1;

    if (!this.tableData || this.tableData.length === 0) { return []; }

    workData = this.tableData;

    if (searchFilter !== '' && searchFilter.length >= searchFilterLength) {
      workData = this.searchTable(workData);
    }

    workData = this.sortTable(workData);

    this.dataLength = workData.length;

    if (rows === -1) {
      data = workData;
    } else {
      for (let i = start; i <= stop; i++) {
        if (workData[i]) { data.push(workData[i]); }
      }
    }

    return data;
  }

  createView() {
    const { sortColumn, sortDir } = this.model.scope;
    const view = this.head;
    if (view) {
      view.forEach((el, index) => {
        if (index === sortColumn) {
          el.sortDir = sortDir;
        } else {
          el.sortDir = null;
        }
      });
    }
    return view;
  }

  getItemContent(data): string | number | Date {
    const { sortColumn } = this.model.scope;
    const format = this.head ? this.head[sortColumn]['format'] : undefined;
    const formatMask = this.head ? this.head[sortColumn]['formatMask'] : undefined;
    const thousandSeparator = this.head ? this.head[sortColumn]['thousandSeparator'] : ',';
    const decimalSeparator = this.head ? this.head[sortColumn]['decimalSeparator'] : '.';

    let result: string | number | Date = ('' + data).toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

    if (result && format) {
      if (['number', 'int', 'float', 'money'].indexOf(format) !== -1 && (thousandSeparator !== ',' || decimalSeparator !== '.')) {
        result = Utils.parseNumber(result, thousandSeparator, decimalSeparator);
      }

      switch (format) {
        case 'date': result = Utils.isValue(formatMask) ? result.toDate(formatMask) : new Date(result); break;
        case 'number': result = Number(result); break;
        case 'int': result = parseInt(result.toString(), 10); break;
        case 'float': result = parseFloat(result.toString()); break;
        case 'money': result = Utils.parseMoney(result); break;
        case 'card': result = Utils.parseCard(result); break;
        case 'phone': result = Utils.parsePhone(result); break;
      }
    }

    return result;
  }

  sortTable(data) {
    const { sortColumn, sortDir } = this.model.scope;
    return !data ? data : data.sort((a, b) => {
      const item1 = this.getItemContent(a[sortColumn]),
        item2 = this.getItemContent(b[sortColumn]);
      let result = 0;
      if (item1 < item2) {
        result = sortDir === 'asc' ? -1 : 1;
      }
      if (item1 > item2) {
        result = sortDir === 'asc' ? 1 : -1;
      }
      return result;
    });
  }

  searchTable(data) {
    const { searchFilter } = this.model.scope;
    return data.filter((el) => {
      let textContent = '';
      for (let i = 0; i < el.length; i++) {
        textContent += ' ' + el[i];
      }
      return textContent.toLowerCase().includes(searchFilter);
    });
  }

  paginationClick(page) {
    let nextPage;
    const { page: currentPage } = this.model.scope;

    if (page === 'next') {
      nextPage = +currentPage + 1;
    } else if (page === 'prev') {
      nextPage = +currentPage - 1;
    } else {
      nextPage = +page;
    }

    this.model.scope.page = nextPage;
  }

  rowsChange(e) {
    const rows = parseInt(e.target.value, 10);
    this.model.scope.rows = rows === -1 ? this.tableData.length : rows;
  }

  onHeadClick(e) {
    const columnIndex = parseInt(e.target.getAttribute('index'), 10);
    const { sortColumn, sortDir } = this.model.scope;
    if (e.target.className.contains('sortable-column')) {
      this.model.scope.sortColumn = columnIndex;
      this.model.scope.sortDir = columnIndex === sortColumn ? sortDir === 'asc' ? 'desc' : 'asc' : 'asc';
    }
    this.dispatch('headclick', e);
  }

  onCellClick(e) {
    this.dispatch('cellclick', e);
  }

  searchFilterChange(e) {
    const val = e.target.value ? e.target.value.trim() : '';

    clearTimeout(this.searchThresholdTimer);
    this.searchThresholdTimer = false;

    if (!this.searchThresholdTimer) {
      this.searchThresholdTimer = setTimeout(() => {
        this.model.scope.searchFilter = val;
        this.model.scope.page = 1;

        clearTimeout(this.searchThresholdTimer);
        this.searchThresholdTimer = false;
      }, this.data.searchFilterThreshold);
    }
  }

  async render() {
    const {
      source, pagination, search, info, infoTemplate, rowsSteps, rows: initRowsCount,
      clsSearchBlock, clsInfoBlock, clsSearch, clsRows, clsPagination, clsPaginationBlock, clsInfo, searchPlaceholder, rowsTitle,
      searchFilter: initSearchFilter, searchFilterThreshold, searchFilterLength,
      scrollable, decimalSeparator, thousandSeparator,
      ...rest } = this.data;
    const { rows, page, searchFilter } = this.model.scope;

    const dataLength = this.dataLength;
    const dataStart = (rows === -1 ? 1 : (rows * (page - 1)) + 1) + 1;
    const dataStop = (rows === -1 ? dataLength - 1 : dataStart + rows - 1) + 1;

    const tableBody = this.sliceData();
    const tableHeader = this.createView();

    return (
      <div className={'memory-table'}>

        <div className={clsSearchBlock}>
          <div className={clsSearch}>
            <ui-input placeholder={searchPlaceholder} onChange={this.searchFilterChange} onClear={this.searchFilterChange} value={searchFilter} />
          </div>
          <div className={clsRows}>
            <ui-select value={rows} prepend={rowsTitle} onChange={this.rowsChange}>
              {rowsSteps.map((val, index) => {
                return (<option key={index} value={val}>{val === -1 ? 'All' : val}</option>);
              })}
            </ui-select>
          </div>
        </div>

        <div className={'table-container ' + (scrollable ? 'horizontal-scroll' : '')}>
          <ui-table head={tableHeader} body={tableBody} {...rest} ref={this.table} onHeadClick={this.onHeadClick} onCellClick={this.onCellClick} />
        </div>

        {(pagination || info) && (
          <div className={clsInfoBlock}>
            {info && (
              <div className={'info-wrapper ' + clsInfo}>
                <span>{
                  infoTemplate
                    .replace('$1', dataStart.toString())
                    .replace('$2', dataStop.toString())
                    .replace('$3', dataLength.toString())
                }</span>
              </div>
            )}

            {pagination && (
              <div className={'pagination-wrapper ' + clsPaginationBlock}>
                <ui-pagination total={dataLength} itemsPerPage={rows} current={page} n-on-click={this.paginationClick} cls={clsPagination} />
              </div>
            )}
          </div>
        )}

      </div>
    );
  }
}

interface MemoryTableProps {
  scrollable: boolean;
  source: string;
  pagination: boolean;
  search: boolean;
  info: boolean;
  infoTemplate: string;
  rowsSteps: number[];
  rows: number;
  rowsTitle: string;
  searchPlaceholder: string;
  searchFilter: string;
  searchFilterLength: number;
  searchFilterThreshold: number;
  decimalSeparator?: string;
  thousandSeparator?: string;
  clsSearchBlock: string;
  clsSearch: string;
  clsRows: string;
  clsInfoBlock: string;
  clsPagination: string;
  clsPaginationBlock: string;
  clsInfo: string;
}
