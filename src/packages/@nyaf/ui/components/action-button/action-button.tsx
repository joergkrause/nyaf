import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
require('./action-button.scss');

@CustomElement('ui-actionbutton')
@Properties<ActionButtonProps>(
  {
    as: 'button',
    variant: 'default',
    icon: null,
    iconPrefix: 'mif-',
    image: null,
    cls: '',
    className: '',
    clsIcon: '',
  }
)
export class ActionButton extends BaseComponent<ActionButtonProps> {
  render() {
    const { as: Element, variant, icon, iconPrefix, image, cls, className, clsIcon, ...rest } = this.data;

    return (
      <Element className={`action-button ${cls} ${className} ${variant === 'secondary' ? 'second' : ''}`} {...rest}>
        {icon && (
          <ui-icon name={icon} iconPrefix={iconPrefix} cls={clsIcon} />
        )}
        {image && (
          <img src={image} alt='' className={clsIcon} />
        )}
      </Element>
    );
  }
}

interface ActionButtonProps {
  as: string;
  variant: 'default' | 'secondary';
  icon: string;
  iconPrefix: string;
  image: string;
  cls: string;
  className: string;
  clsIcon: string;
}
