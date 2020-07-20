import { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
import { MediaPoints } from '../../routines';
require('./app-bar.scss');

@CustomElement('ui-appbar')
@Properties<AppBarProps>({
  as: 'header',
  cls: '',
  expand: false,
  expandPoint: 'md',
  hamburgerTheme: 'dark'
})
export class AppBar extends BaseComponent<AppBarProps {
  constructor() {
    super();

    this.medias = [];

    this.windowResize = this.windowResize.bind(this);
    this.collectMedias = this.collectMedias.bind(this);
    this.hamburgerClick = this.hamburgerClick.bind(this);

    this.collectMedias();

    const expanded = this.props.expand || this.medias.includes(this.props.expandPoint);

    this.state = {
      expanded: expanded,
      menuCollapsed: !expanded
    };
  }

  collectMedias() {
    this.medias = [];
    for (const k in MediaPoints) {
      if (window.matchMedia(`(min-width: ${MediaPoints[k]}px)`).matches) {
        this.medias.push(k);
      }
    }
  }

  windowResize() {
    this.collectMedias();
    const expanded = this.props.expand || this.medias.includes(this.props.expandPoint);
    this.setState({
      expanded: expanded,
      menuCollapsed: !expanded
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  hamburgerClick() {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed
    });
  }

  async render() {
    const { as: Element, cls, hamburgerTheme } = this.data
    const { expanded, menuCollapsed } = this.state;

    return await (
      <Element className={'app-bar ' + cls + ' ' + (expanded ? 'app-bar-expand' : '')}>

        <Hamburger theme={hamburgerTheme} active={!menuCollapsed} hidden={expanded} onClick={this.hamburgerClick} />

        {Children.map(this.props.children, function (el, index) {
          if (el.type.name === 'AppBarMenu') {
            return React.cloneElement(el, {
              style: { overflow: '' },
              collapsed: menuCollapsed
            }, el.props.children);
          }

          return el;
        })}
      </Element>
    );
  }
}

interface AppBarProps {
  as: 'header';
  cls: string;
  expand: boolean;
  expandPoint: string;
  hamburgerTheme: 'dark';
}
