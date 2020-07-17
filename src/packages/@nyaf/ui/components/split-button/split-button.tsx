import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./split-button.scss');

@CustomElement('ui-split')
@Properties<SplitButtonProps>({
  cls: '',
  className: ''
})
@Events([])
export class SplitButton extends BaseComponent<SplitButtonProps> {

  constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onClick(e);
    }

    async render() {
        const {cls, className} = this.data;
        const children = React.Children.toArray(this.children);
        return (
            <div className={`split-button ${cls} ${className}`}>
                {React.cloneElement(children[0], {})}

                {children[2] && (
                    <ui-dropdown>
                        {React.cloneElement(children[1], {
                            className: `split dropdown-toggle ${children[1].props.cls ? children[1].props.cls : ''} ${children[1].props.className ? children[1].props.className : ''}`
                        })}
                        {React.cloneElement(children[2], {
                            className: `d-menu ${children[2].props.cls ? children[2].props.cls : ''} ${children[2].props.className ? children[2].props.className : ''}`
                        })}
                    </ui-dropdown>
                )}

                {!children[2] && (
                    <>
                        {React.cloneElement(children[1], {
                            className: `split ${children[1].props.cls ? children[1].props.cls : ''} ${children[1].props.className ? children[1].props.className : ''}`
                        })}
                    </>
                )}
            </div>
        );
    }
}

interface SplitButtonProps {
    cls: '',
    className: ''
}
