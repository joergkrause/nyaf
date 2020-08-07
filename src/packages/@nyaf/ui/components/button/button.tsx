import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
// require('./button.scss');

@CustomElement('ui-button')
@Properties<ButtonProps>({
  as: 'button',
  title: '',
  badge: null,
  icon: null,
  iconPrefix: 'mif-',
  image: null,
  cls: '',
  className: '',
  clsTitle: '',
  clsIcon: '',
  clsBadge: ''
})
export class Button extends BaseComponent<ButtonProps> {

  private button: HTMLElement;

  constructor() {
    super();
  }

  async render() {
    const {
      as: Element,
      icon,
      iconPrefix,
      image,
      title,
      cls, className,
      clsTitle, clsIcon, clsBadge,
      badge,
      ...rest
    } = this.data;

    const classButton = `button ${cls} ${className}`;

    return JSX.createElement(Element, Object.assign({ className: classButton }, rest),
        (
          <>
            {icon && (
              <ui-icon prefix={iconPrefix} name={icon} cls={clsIcon} />
            )}

            {image && (
              <img className={'icon ' + clsIcon} src={image} alt='' />
            )}

            {title && (
              <span className={'caption ' + clsTitle}>{title}</span>
            )}

            {badge !== null && (
              <ui-badge value={badge} cls={clsBadge} />
            )}
          </>
        ), <>this.children</>
      );
  }
}

interface ButtonProps {
  as: string;
  title: string;
  badge: null;
  icon: null;
  iconPrefix: string;
  image: null;
  cls: string;
  className: string;
  clsTitle: string;
  clsIcon: string;
  clsBadge: string;
}
