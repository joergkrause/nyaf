import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./info-button.scss');

@CustomElement('ui-infobutton')
@Properties<InfoButtonProps>({
  as: 'button',
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
  }

  onClick(e: Event) {
    this.dispatch('click', {});
  }

  async render() {
    const SubElement = this.data.as === 'link' ? 'span' : 'a';
    const {
      title, subtitle, href, hrefTitle, hrefSubtitle,
      icon, image,
      cls, className, clsTitle, clsSubtitle, clsIcon
    } = this.data;
    const elemProps = {};
    const buttonProps = {};
    const infoProps = {};

    if (this.data.as === 'a') {
      elemProps.href = href;
    } else {
      buttonProps.href = hrefTitle;
      infoProps.href = hrefSubtitle;
    }

    return await (
      <Element className={`info-button ${cls} ${className}`} {...elemProps} n-on-click={this.onClick}>
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
  as: 'button' | 'link';
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
