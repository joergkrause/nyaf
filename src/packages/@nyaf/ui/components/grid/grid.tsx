import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
require('./grid.scss');

@CustomElement('ui-grid')
@Properties<GridRowCellProperties> (
  {
    as: 'div',
    cls: '',
    className: ''
  }
)
export class Grid extends BaseComponent<GridRowCellProperties> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <Element className={`grid ${this.data.cls} ${this.data.className}`} {...this.data}>
        {this.children}
      </Element >
    );
  }
}

@CustomElement('ui-row')
@Properties<GridRowCellProperties> (
  {
    as: 'div',
    cls: '',
    className: ''
  }
)
export class Row extends BaseComponent<GridRowCellProperties> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <Element className={`grid ${this.data.cls} ${this.data.className}`} {...this.data}>
        {this.children}
      </Element >
    );
  }
}

@CustomElement('ui-cell')
@Properties<GridRowCellProperties> (
  {
    as: 'div',
    cls: '',
    className: ''
  }
)
export class Cell extends BaseComponent<GridRowCellProperties> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <Element className={`grid ${this.data.cls} ${this.data.className}`} {...this.data}>
        {this.children}
      </Element >
    );
  }
}

interface GridRowCellProperties {
  as: string;
  cls: string;
  className: string;
}

