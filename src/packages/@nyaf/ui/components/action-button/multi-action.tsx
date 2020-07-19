import JSX, { CustomElement, BaseComponent, Properties, Events } from '@nyaf/lib';
require('./action-button.scss');

@CustomElement('ui-multiactionitem')
@Properties<MultiActionItemProps>({
  icon: null,
  iconPrefix: 'mif-',
  image: null,
  cls: '',
  className: ''
})
@Events(['Click'])
export class MultiActionItem extends BaseComponent<MultiActionItemProps> {

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.dispatch('click', e);
  }

  render() {
    const { icon, iconPrefix, cls, className, ...rest } = this.data;
    return (
      <li>
        <a {...rest} onClick={this.onClick}>
          <ui-icon name={icon} prefix={iconPrefix} cls={cls + ' ' + className} />
        </a>
      </li>
    );
  }
}

interface MultiActionItemProps {
  icon: null;
  iconPrefix: string;
  image: null;
  cls: string;
  className: string;
}

@CustomElement('ui-multiaction')
@Properties<MultiActionProps>({
  drop: 'up',
  itemClickClose: false,
})
@Events(['Click'])
export class MultiAction extends BaseComponent<MultiActionProps> {
  constructor() {
    super();

    this.state = {
      active: false
    };

    this.toggleState = this.toggleState.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  toggleState(e) {
    const active = !!this.state.active;

    this.setState({
      active: !active
    });

    this.props.onClick(e);
  }

  itemClick(e, click) {
    if (this.props.itemClickClose) { this.toggleState(); }
    click();
  }

  async render() {
    const { drop, itemClickClose, ...rest } = this.data;

    rest.cls = this.state.active ? rest.cls + ' active ' : rest.cls;

    return await (
      <div className='multi-action'>
        <ActionButton {...rest} onClick={this.toggleState} />
        <ul className={'actions drop-' + drop}>
          {Array.from(this.children).map((item, index) => {
            return (
              <ui-multiactionitem key={index} {...item.props} onClick={(e) => { this.itemClick(e, item.props.onClick); }}></ui-multiactionitem>
            );
          })}
        </ul>
      </div>
    );
  }
}

interface MultiActionProps {
  drop: 'up';
  itemClickClose: boolean;
}
