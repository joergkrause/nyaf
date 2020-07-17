import JSX, { BaseComponent, CustomElement, Properties, Events } from "@nyaf/lib";
require('./tabs.scss');

@CustomElement('ui-tabs')
@Properties<TabsProps>({
  active: 0,
  position: "top", // top, bottom, right, left
  variant: "default",
  cls: "",
  clsTabsList: "",
  clsTab: ""
})
@Events(['TabClick'])
export class Tab extends BaseComponent<TabsProps> {
  async render() {
    const { cls, target, children, ...rest } = this.data;

    return await (
      <li className={cls} {...rest}><a href={'#' + target} >{this.children}</a></li>
    )
  }
}

interface TabProps {
  cls: "",
  target: "",
  onClick: () => { }
}

@CustomElement('ui-')
@Properties<>({})
@Events([])
export class Tabs extends BaseComponent {
  constructor() {
    super();

    const tabs = Children.toArray(props.children);
    let openTab = 0;

    tabs.forEach((t, i) => {
      if (i === parseInt(props.active)) {
        openTab = i;
      }
    });

    this.state = {
      tab: openTab
    };

    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(e) {
    const tab = parseInt(e.target.parentNode.getAttribute('tab'));
    this.setState({
      tab: tab
    });
    this.props.onTabClick(e);
    e.preventDefault();
  }

  async render() {
    const { position, variant, cls, clsTabsList, clsTab } = this.data;
    const classPosition = (position === 'left' || position === 'right' ? ' vertical ' : ' horizontal ') + ' ' + position;
    const { tab } = this.state;

    return (
      <div className={`tabs ${classPosition} ${cls}`}>
        <ul className={`tabs-list tabs-${variant} ${clsTabsList}`}>
          {Children.map(this.props.children, (el, index) => {
            const status = index === tab ? ' active ' : '';
            return (
              React.cloneElement(el, {
                key: index,
                cls: el.props.cls + ' ' + clsTab + status,
                tab: index,
                onClick: this.onTabClick
              })
            )
          })}
        </ul>
      </div>
    )
  }
}

interface TabsProps {
  active: 0,
  position: "top", // top, bottom, right, left
  variant: "default",
  cls: "",
  clsTabsList: "",
  clsTab: "",
  onTabClick: () => {}
}
