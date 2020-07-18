import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

@CustomElement('ui-appbar-meu')
@Properties<AppBarMenuProps>({
  cls: '',
  collapsed: false,
  speed: 300
})
export class AppBarMenu extends BaseComponent<AppBarMenuProps> {
  static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed) {
      return {
        collapsed: props.collapsed,
      };
    }
    return null;
  }

  constructor() {
    super();
    this.state = {
      collapsed: props.collapsed
    };
  }

  async render() {
    const { cls, speed, collapsed: initCollapsed, ...props } = this.data;
    const { collapsed } = this.state;
    const transition = `height ${speed}ms cubic-bezier(.4, 0, .2, 1)`;

    return await (
      <ui-collapse
        isOpen={!collapsed}
        elementType={'ul'}
        className={'app-bar-menu ' + cls + ' ' + (collapsed ? '-is-collapsed' : '')}
        transition={transition}
        ref={ref => this.menu = ref}
        {...props} >
        {this.children}
      </ui-collapse>
    );
  }
}

interface AppBarMenuProps {
  cls: string;
  collapsed: boolean;
  speed: number;
}
