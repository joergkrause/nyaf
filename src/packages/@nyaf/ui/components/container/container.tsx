import JSX, { BaseComponent } from '@nyaf/lib';
require('./container.scss');

export default class Container extends BaseComponent<{}> {
    async render() {
        const {as: Element, fluid, cls, className, ...rest} = this.props;

        return (
            <Element className={`container${fluid ? '-fluid' : ''} ${cls} ${className}`} {...rest}>
                {this.props.children}
            </Element>
        )
    }
}

Container.defaultProps = {
    as: "div",
    fluid: false,
    cls: "",
    className: ""
};