import JSX, { Properties, CustomElement, BaseComponent } from '@nyaf/lib';
require('../button/button.scss');
require('./bottom-nav.scss');

@CustomElement('ui-bottomnav-item')
@Properties<BottomNavItemProps>({
  as: 'button',
  label: '',
  icon: false,
  image: false,
  clsButton: '',
  clsButtonIcon: '',
  clsButtonLabel: ''
})
export class BottomNavItem extends BaseComponent<BottomNavItemProps> {

  constructor() {
    super();
  }

  async render() {
    const {
      label,
      icon,
      image,
      clsButton,
      clsButtonIcon,
      clsButtonLabel
    } = this.data;

    const Element = this.data.as;

    return (
      JSX.createElement(Element, { className: 'button ' + clsButton },
        (<>
          <span className={'icon ' + clsButtonIcon}>
            {icon && (
              <span className={'mif-' + icon} />
            )}

            {image && (
              <img src={image} alt='' />
            )}
          </span>
          <span className={'label ' + clsButtonLabel}>
            {label}
          </span>
        </>)
      ));

  }
}

interface BottomNavItemProps {
  as: 'button';
  label: string;
  icon: boolean;
  image: boolean;
  clsButton: string;
  clsButtonIcon: string;
  clsButtonLabel: string;
}

@CustomElement('ui-bottomnav')
@Properties<BottomNavProps>({
  cls: '',
  className: ''
})
export class BottomNav extends BaseComponent<BottomNavProps> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div className={`bottom-nav ${this.data.cls} ${this.data.className} `}>
        {this.children}
      </div>
    );
  }
}

interface BottomNavProps {
  cls: string;
  className: string;
}
