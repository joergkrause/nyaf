import JSX, { BaseComponent } from '@nyaf/lib';

import {MD5} from "../../routines";

export default class Gravatar extends BaseComponent<{}> {
    async render() {
        const {size, defaultImage, email, cls, className, ...props} = this.props;
        const src = `//www.gravatar.com/avatar/${MD5((email.toLowerCase()).trim())}?size=${size}&d=${defaultImage}`;

        return (
            <img src={src} className={`gravatar ${cls} ${className}`} {...props}/>
        )
    }
}

Gravatar.defaultProps = {
    size: 80,
    defaultImage: "mp",
    cls: "",
    className: ""
};

Gravatar.propsTypes = {
    email: PropTypes.string.isRequired
};