import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
require('./command-button.scss');

@CustomElement('ui-command')
@Properties<CommandButtonProps>({
  as: 'button',
  title: '',
  subtitle: '',
  icon: null,
  iconPrefix: 'mif-',
  image: null,
  cls: '',
  className: '',
  clsTitle: '',
  clsSubtitle: '',
  clsIcon: ''
})
export class CommandButton extends BaseComponent<CommandButtonProps> {

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
      subtitle,
      cls,
      className,
      clsTitle,
      clsSubtitle,
      clsIcon,
      ...rest
    } = this.data;

    return await (
      <Element className={`command-button ${cls} $className`} ref={this.button} {...rest}>
        {icon && (
          <ui-icon name={icon} prefix={iconPrefix} cls={'icon ' + clsIcon} />
        )}

        {image && (
          <img className={'icon ' + clsIcon} src={image} alt='' />
        )}
        <span className={'caption ' + clsTitle}>
          {title}
          <small className={clsSubtitle}>{subtitle}</small>
        </span>
      </Element>
    );
  }
}

interface CommandButtonProps {
  as: 'button';
  title: string;
  subtitle: string;
  icon: string;
  iconPrefix: string;
  image: string;
  cls: string;
  className: string;
  clsTitle: string;
  clsSubtitle: string;
  clsIcon: string;
}
