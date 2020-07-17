import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./toolbar.scss');

@CustomElement('ui-toolbutton')
@Properties<ToolButtonProps>({
  as: 'span',
  cls: '',
  className: ''
})
export class ToolButton extends BaseComponent<ToolButtonProps> {
    render() {
        const {as: Element, cls, className, ...rest} = this.data;
        return (
            <Element className={`tool-button ${cls} ${className}`} {...rest}>
                {this.children}
            </Element>
        );
    }
}

interface ToolButtonProps {
    as: 'span',
    cls: '',
    className: ''
}

@CustomElement('ui-toolbar')
@Properties<ToolBarProps>({
  vertical: false,
  cls: '',
  className: ''
})
@Events([])
export class ToolBar extends BaseComponent<ToolBarProps> {
    render() {
        const {vertical, cls, className} = this.data;

        return (
            <div className={`toolbar ${cls} ${className} ${vertical ? 'vertical' : ''}`}>
                {Children.map(this.props.children, function(el, index) {
                    return (
                        <ToolButton {...el.props} key={index}>
                            {el.props.children}
                        </ToolButton>
                    );
                })}
            </div>
        );
    }
}

interface ToolBarProps {
    vertical: false;
    cls: '',
    className: ''
}
