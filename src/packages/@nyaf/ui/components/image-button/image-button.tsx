import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
import { Icon } from '..';
require('./image-button.scss');

@CustomElement('ui-imagebutton')
@Properties<ImageButtonProps>({
  as: 'button',
  title: '',
  icon: null,
  iconPrefix: 'mif-',
  image: null,
  cls: '',
  className: '',
  clsIcon: '',
  clsTitle: ''
})
export default class ImageButton extends BaseComponent<ImageButtonProps> {
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
      cls,
      className,
      clsIcon,
      clsTitle,
      ...rest
    } = this.data;

    return (
      <Element className={`image-button ${cls} ${className}`} ref={this.button} {...rest}>
        {icon && (
          <Icon name={icon} prefix={iconPrefix} cls={'icon ' + clsIcon} />
        )}

        {image && (
          <img className={'icon ' + clsIcon} src={image} alt='' />
        )}
        {title && (
          <span className={'caption '}>{title}</span>
        )}

        {this.children}
      </Element>
    );
  }
}

interface ImageButtonProps {
  as: string;
  title: string;
  icon: null;
  iconPrefix: string;
  image: null;
  cls: string;
  className: string;
  clsIcon: string;
  clsTitle: string;
}
