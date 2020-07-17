import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
import './info-button.css';

@CustomElement('ui-infobutton')
@Properties<InfoButtonProps>({
  as: 'span',
  title: '',
  subtitle: '',
  href: '',
  hrefTitle: '',
  hrefSubtitle: '',
  icon: null,
  iconPrefix: 'mif-',
  image: null,
  cls: '',
  className: '',
  clsTitle: '',
  clsSubtitle: '',
  clsIcon: ''
})
@Events(['click'])
export class InfoButton extends BaseComponent<InfoButtonProps> {
  constructor() {
    super();
    this.button = React.createRef();
  }

  async render() {
    const SubElement = this.props.as === 'a' ? 'span' : 'a';
    const {
      as: Element, title, subtitle, href, hrefTitle, hrefSubtitle,
      icon, image,
      cls, className, clsTitle, clsSubtitle, clsIcon,
      onClick
    } = this.props;
    const elemProps = {};
    const buttonProps = {};
    const infoProps = {};

    if (this.props.as === 'a') {
      elemProps.href = href;
    } else {
      buttonProps.href = hrefTitle;
      infoProps.href = hrefSubtitle;
    }

    return (
      <Element className={`info-button ${cls} ${className}`} {...elemProps} onClick={onClick}>
        <SubElement {...buttonProps} className={'button ' + clsTitle}>
          {icon && (
            <ui-con name={icon} cls={'icon ' + clsIcon} />
          )}

          {image && (
            <img src={image} alt='' className={'icon ' + clsIcon} />
          )}

          {title}
        </SubElement>

        <SubElement {...infoProps} className={'info ' + clsSubtitle}>
          <span>{subtitle}</span>
        </SubElement>
      </Element>
    );
  }
}

interface InfoButtonProps {
  as: string;
  title: string;
  subtitle: string;
  href: string;
  hrefTitle: string;
  hrefSubtitle: string;
  icon: null;
  iconPrefix: string;
  image: null;
  cls: string;
  className: string;
  clsTitle: string;
  clsSubtitle: string;
  clsIcon: string;
}
