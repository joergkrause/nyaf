import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
import { IModel, ModelBinder } from '@nyaf/forms';
require('./tabs.scss');

@CustomElement('ui-tabs')
@Properties<TabProps>(
  {
    cls: '',
    target: ''
  })
@Events(['click'])
export class Tab extends BaseComponent<TabProps> {
  async render() {
    const { cls, target, ...rest } = this.data;

    return await (
      <li className={cls} {...rest}><a href={'#' + target} >{this.children}</a></li>
    );
  }
}

interface TabProps {
  cls: string;
  target: string;
}

class TabsModel {
  tab: number;
}

@CustomElement('ui-tabs')
  @Properties<TabsProps>({
  active: 0,
  position: 'top', // top, bottom, right, left
  variant: 'default',
  cls: '',
  clsTabsList: '',
  clsTab: ''
})
@Events([])
export class Tabs extends BaseComponent<TabsProps> implements IModel<TabsModel> {
  constructor() {
    super();

    const tabs = Array.from(this.children);
    let openTab = 0;

    tabs.forEach((t, i) => {
      if (i === +this.data.active) {
        openTab = i;
      }
    });

    this.model.scope.tab = openTab;

    this.onTabClick = this.onTabClick.bind(this);
  }
  model: ModelBinder<TabsModel>;

  onTabClick(e) {
    const tab = parseInt(e.target.parentNode.getAttribute('tab'), 10);
    this.model.scope.tab = tab;
    this.dispatch('tabclick', e);
    e.preventDefault();
  }

  async render() {
    const { position, variant, cls, clsTabsList, clsTab } = this.data;
    const classPosition = (position === 'left' || position === 'right' ? ' vertical ' : ' horizontal ') + ' ' + position;
    const { tab } = this.model.scope;

    return (
      <div className={`tabs ${classPosition} ${cls}`}>
        <ul className={`tabs-list tabs-${variant} ${clsTabsList}`}>
          {Array.from(this.children).map((el, index) => {
            const status = index === tab ? ' active ' : '';
            return (
              React.cloneElement(el, {
                key: index,
                cls: el.props.cls + ' ' + clsTab + status,
                tab: index,
                onClick: this.onTabClick
              })
            );
          })}
        </ul>
      </div>
    );
  }
}

interface TabsProps {
  active: number;
  position: 'top' | 'bottom' | 'right' | 'left';
  variant: 'default';
  cls: string;
  clsTabsList: string;
  clsTab: string;
}
