import JSX, { CustomElement, BaseComponent, Properties } from '@nyaf/lib';
import '../css/side-bar.css';

const menuItems = {
  'General': [
    { to: '/guide', caption: 'Intro', exact: true },
    { to: '/guide/common', caption: 'Common styles' },
    { to: '/guide/colors', caption: 'Colors styles' },
  ],
  'Grid & Table': [
    { to: '/guide/grid', caption: 'Responsive Grid' },
    { to: '/guide/table', caption: 'Table' },
    { to: '/guide/memory-table', caption: 'MemoryTable' }
  ],
  'Buttons': [
    { to: '/guide/push-button', caption: 'PushButton' },
    { to: '/guide/split-button', caption: 'SplitButton' },
    { to: '/guide/tool-button', caption: 'ToolButton' },
    { to: '/guide/command-button', caption: 'CommandButton' },
    { to: '/guide/info-button', caption: 'InfoButton' },
    { to: '/guide/image-button', caption: 'ImageButton' },
    { to: '/guide/action-button', caption: 'ActionButton' },
    { to: '/guide/shortcut', caption: 'Shortcut' },
    { to: '/guide/pagination', caption: 'Pagination' },
    { to: '/guide/breadcrumbs', caption: 'Breadcrumbs' },
    { to: '/guide/hamburger', caption: 'Hamburger' },
    { to: '/guide/button-group', caption: 'ButtonGroup' },
  ],
  'Form elements': [
    { to: '/guide/input', caption: 'Input' },
    { to: '/guide/input-file', caption: 'File' },
    { to: '/guide/checkbox', caption: 'Checkbox' },
    { to: '/guide/switch', caption: 'Switch' },
    { to: '/guide/radio', caption: 'Radio' },
    { to: '/guide/select', caption: 'Select' },
    { to: '/guide/select-color', caption: 'SelectColor' },
    { to: '/guide/select-icon', caption: 'SelectIcon' },
    { to: '/guide/rating', caption: 'Rating' },
    { to: '/guide/textarea', caption: 'Textarea' },
  ],
  'Menus': [
    { to: '/guide/app-bar', caption: 'AppBar' },
    { to: '/guide/bottom-nav', caption: 'BottomNav' },
  ],
  'Layout': [
    { to: '/guide/container', caption: 'Container' },
    { to: '/guide/panel', caption: 'Panel' },
    { to: '/guide/info-panel', caption: 'InfoPanel' },
    { to: '/guide/accordion', caption: 'Accordion' },
    { to: '/guide/tabs', caption: 'Tabs' },
    { to: '/guide/modal', caption: 'Modal' },
    { to: '/guide/body', caption: 'Body' },
    { to: '/guide/html-container', caption: 'HtmlContainer' },
    { to: '/guide/dialog', caption: 'Dialog' },
  ],
  'Dropdown & collapse': [
    { to: '/guide/collapse', caption: 'Collapse' },
    { to: '/guide/dropdown', caption: 'Dropdown' },
  ],
  'Routines': [
    { to: '/guide/utils', caption: 'Utils functions' },
    { to: '/guide/color', caption: 'Color routines' },
    { to: '/guide/md5', caption: 'MD5' },
    { to: '/guide/media', caption: 'Media' },
  ],
  'Icon font': [
    { to: '/guide/mif', caption: 'Metro Icon Font' },
    { to: '/guide/icon', caption: 'Icon' },
    { to: '/guide/other-icon-fonts', caption: 'Other icon fonts' },
  ]
};

@CustomElement('demo-sidemenu')
@Properties<{ open: boolean, isMobile: boolean }>(
  {
    open: false,
    isMobile: false
  }
)
export class SideMenu extends BaseComponent<{ open: boolean, isMobile: boolean }> {

  private open: boolean;
  private isMobile: boolean;

  constructor() {
    super();
    this.open = !this.data.isMobile;
    this.isMobile = this.data.isMobile;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isMobile !== state.isMobile) {
      return {
        open: !props.isMobile,
        isMobile: props.isMobile
      };
    }
    return null;
  }

  toggleMenu(e) {
    if (this.isMobile) {
      this.open = !this.open;
      this.setup();
    }
  }

  async render() {
    const items = [];
    let itemIndex = -1;

    // tslint:disable-next-line: forin
    for (const itemGroup in menuItems) {
      items.push(<li key={itemIndex++} className={'group-title'}>{itemGroup.toUpperCase()}</li>);

      menuItems[itemGroup].map(item => {
        return items.push(
          <li key={itemIndex++}>
            <ui-navlink exact={item.exact ? true : null} to={item.to} n-on-click={this.toggleMenu}>{item.caption}</ui-navLink>
          </li>);
      });
    }

    return await (
      <div className={'side-bar'}>
        <demo-searchform />

        <div className='p-4' hidden={!this.data.isMobile} >
          <ui-button cls={'dropdown-toggle w-100 ' + (open ? 'active-toggle' : '')} n-on-click={this.toggleMenu}>Navigator</ui-button>
        </div>

        <ui-collapse isOpen={open}>
          <ul className={'side-bar-menu'}>
            {items}
          </ul>
        </ui-collapse>
      </div>
    );
  }
}
