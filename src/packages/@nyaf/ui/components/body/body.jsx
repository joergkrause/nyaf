import JSX from '@nyaf/lib'

export default class Body extends BaseComponent<{}> {
    async render() {
        return ReactDom.createPortal(
            this.props.children,
            document.body
        )
    }
}