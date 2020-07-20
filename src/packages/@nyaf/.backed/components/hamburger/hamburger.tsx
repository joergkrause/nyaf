import JSX, { CustomElement, Properties, BaseComponent, Events } from '@nyaf/lib';
require('./hamburger.scss');


@CustomElement('ui-hamburger')
@Properties<HamburgerProps>({
  cls: '',
  className: '',
  variant: 'menu-down',
  active: false,
  theme: 'light'
})
@Events(['click'])
export class Hamburger extends BaseComponent<HamburgerProps> {

  constructor() {
    super();
  }

  onClick(e) {
    this.dispatch('click', {});
  }

  async render() {
    const { theme, cls, className, variant, active, ...rest } = this.data;

    return await (
      <button className={`hamburger ${theme} ${variant} ${cls} ${className} ${active ? 'active' : ''}`} n-on-click={this.onClick} {...rest}>
        <span className={'line'} />
        <span className={'line'} />
        <span className={'line'} />
      </button>
    );
  }
}

interface HamburgerProps {
  cls?: string;
  className?: string;
  variant?: 'menu-down';
  active?: boolean;
  theme?: 'light' | 'dark';
}
