import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';
import Icon from '../icon/icon.jsx';
import './button.css';
import Badge from '../badge/badge';


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
  lsBadge: ''
})
export class Button extends BaseComponent<ButtonProps> {
  constructor() {
    super();
    this.button = React.createRef();
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

    return (
      <Element className={classButton} ref={this.button} {...rest}>
        {icon && (
          <Icon prefix={iconPrefix} name={icon} cls={clsIcon} />
        )}

        {image && (
          <img className={'icon ' + clsIcon} src={image} alt='' />
        )}

        {title && (
          <span className={'caption ' + clsTitle}>{title}</span>
        )}

        {badge !== null && (
          <Badge value={badge} cls={clsBadge} />
        )}

        {this.children}
      </Element>
    );
  }
}

interface ButtonProps {
  as: string;
  title: string;
  badge: null;
  icon: null;
  iconPrefix: 'mif-';
  image: null;
  cls: string;
  className: string;
  clsTitle: string;
  clsIcon: string;
  lsBadge: string;
}
