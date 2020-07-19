import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./select-color.scss');

const SelectColorItem = (props) => {
  return (
    <div className='select-color-item'>
      <span className='box' style={{ background: props.color }} />
      <span className='caption' hidden={props.hidden}>{props.caption}</span>
    </div>
  );
};

@CustomElement('ui-selectcolor')
@Properties<SelectColorProps>({
  source: null,
  showColorName: true,
  cls: '',
  className: ''
})
@Events([])
export class SelectColor extends BaseComponent<SelectColorProps> {
  constructor() {
    super();
    let source = {};

    if (!props.source) {
      React.Children.toArray(this.children).forEach((el) => {
        source = Object.assign(source, { [el.props.children]: el.props.value });
      });
    }
    this.source = props.source ? props.source : source;
    this.drawItem = this.drawItem.bind(this);
  }

  drawItem(item) {
    return !this.source ? item : <SelectColorItem color={this.source[item]} hidden={!this.props.showColorName} caption={item} />;
  }

  async render() {
    const { colorNameInCaption, colorNameInItem, children, cls, className, ...rest } = this.data;

    return (
      <ui-select className={`select-color ${cls} ${className}`} onDrawItem={this.drawItem} onDrawCaption={this.drawItem} {...rest}>
        {children}
      </ui-select>
    );
  }
}

interface SelectColorProps {
  source: null;
  showColorName: true;
  cls: string;
  className: string;
}
