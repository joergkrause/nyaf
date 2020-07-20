import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./select-icon.scss');
import { FetchStatus } from '../../defines';
import { IModel, ModelBinder } from '@nyaf/forms';

const SelectIconItem = (props) => {
  return (
    <div className='select-icon-item'>
      <div className='icon'>
        <svg width='24' height='24' viewBox={`0 0 ${props.viewWidth} ${props.viewHeight}`}>
          <path d={props.path} stroke={props.color} />
        </svg>
      </div>
      <span className='caption' hidden={props.hidden}>{props.caption}</span>
    </div>
  );
};

class SelectIconModel {
  viewWidth = 0;
  viewHeight = 0;
  loaded: FetchStatus = FetchStatus.init;
  message: string;
}

@CustomElement('ui-selecticon')
@Properties<SelectIconProps>({
  placeholder: 'Select icon...',
  placeholderLoading: 'Loading...',
  placeholderError: '',
  source: null,
  valueAsPath: false,
  iconColor: '#000',
  showIconName: true,
  cls: '',
  className: '',
  viewBoxWidth: 0,
  viewBoxHeight: 0,
  nameInCaption: '',
  nameInItem: ''
})
@Events(['drawicon'])
export class SelectIcon extends BaseComponent<SelectIconProps> implements IModel<SelectIconModel> {

  private source: any;
  private items: any;

  constructor() {
    super();
    this.source = {};
    this.items = {};
    this.model.scope.viewWidth = 0;
    this.model.scope.viewHeight = 0;
    this.model.scope.loaded = FetchStatus.init;
    this.model.scope.message = '';
  }
  model: ModelBinder<SelectIconModel>;

  componentDidMount() {
    const { source } = this.data;

    if (source) {
      fetch(source).then(r => r.text()).then(r => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(r, 'application/xml');
        const fontFace = xml.querySelector('font-face');
        const icons = Array.from(xml.querySelectorAll('glyph')).filter(el => {
          return el.getAttribute('d').trim() !== '';
        }).sort((a, b) => {
          if (a.getAttribute('glyph-name').toLowerCase() < b.getAttribute('glyph-name').toLowerCase()) {
            return -1;
          }
          if (a.getAttribute('glyph-name').toLowerCase() > b.getAttribute('glyph-name').toLowerCase()) {
            return 1;
          }
          return 0;
        });
        icons.forEach(el => {
          this.source = Object.assign(this.source, {
            [el.getAttribute('glyph-name')]: el.getAttribute('d')
          });
          this.items = Object.assign(this.items, {
            [el.getAttribute('glyph-name')]: el.getAttribute('glyph-name')
          });
        });
        this.model.scope.loaded = FetchStatus.ok;
        this.model.scope.message = 'OK';
        this.model.scope.viewWidth = +fontFace.getAttribute('units-per-em');
        this.model.scope.viewHeight = +fontFace.getAttribute('ascent');
      }).catch(e => {
        this.model.scope.loaded = FetchStatus.error;
        this.model.scope.message = e;
      });
    }
  }

  drawItem(item) {
    const { showIconName, iconColor } = this.data;
    const { viewWidth, viewHeight } = this.model.scope;
    return !this.source ? item : <SelectIconItem viewWidth={viewWidth} viewHeight={viewHeight} path={this.source[item]} color={iconColor} hidden={!showIconName} caption={item} />;
  }

  async render() {
    const { placeholder, placeholderLoading, placeholderError, source, viewBoxWidth, viewBoxHeight, nameInCaption, nameInItem, valueAsPath, cls, className, ...rest } = this.data;
    const { loaded, message } = this.model.scope;
    const _placeholder = loaded === FetchStatus.ok ? placeholder : loaded === FetchStatus.error ? placeholderError : placeholderLoading;

    return await (
      <ui-select
        className={`select-icon ${cls} ${className}`}
        n-on-drawitem={this.drawItem}
        n-on-drawcaption={this.drawItem}
        source={valueAsPath ? this.source : this.items} {...rest} placeholder={_placeholder} />
    );
  }
}

interface SelectIconProps {
  placeholder: string;
  placeholderLoading: string;
  placeholderError: string;
  source: null;
  valueAsPath: boolean;
  iconColor: string;
  showIconName: boolean;
  cls: string;
  className: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
  nameInCaption: string;
  nameInItem: string;
}
