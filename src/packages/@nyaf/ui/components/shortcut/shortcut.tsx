import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./shortcut.scss');

@CustomElement('ui-shortcut')
@Properties<ShortcutProps>({
  as: 'button',
  title: '',
  badge: null,
  icon: null,
  iconPrefix: 'mif-',
  image: null,
  cls: '',
  className: '',
  clsIcon: '',
  clsTitle: '',
  clsBadge: ''
})
@Events([])
export class Shortcut extends BaseComponent<ShortcutProps> {
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
            badge,
            cls,
            className,
            clsIcon,
            clsTitle,
            clsBadge,
            ...rest
        } = this.data;

        return (
            <Element className={`shortcut ${cls} ${className}`} ref={this.button} {...rest}>
                {icon && (
                    <ui-icon name={icon} prefix={iconPrefix} cls={'icon ' + clsIcon}/>
                )}

                {image && (
                    <img className={'icon ' + clsIcon} src={image} alt=''/>
                )}

                {title && (
                    <span className={'caption ' + clsTitle}>{title}</span>
                )}

                {badge && (
                    <ui-badge cls={clsBadge} value={badge}/>
                )}
            </Element>
        );
    }
}

interface ShortcutProps {
    as: 'button',
    title: '',
    badge: null;
    icon: null;
    iconPrefix: 'mif-',
    image: null;
    cls: '',
    className: '',
    clsIcon: '',
    clsTitle: '',
    clsBadge: ''
}
