import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
import 'regenerator-runtime/runtime';

@CustomElement('ui-htmlcontainer')
@Properties<HtmlContainerProps>({
  as: 'div',
  source: null,
  insertAs: 'text'
})
export class HtmlContainer extends BaseComponent<HtmlContainerProps> {
    constructor() {
        super();
        this.element = React.createRef();
        this.state = {
            source: props.source,
            fetched: null,
            content: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.source !== state.source) {
            return {
                fetched: null,
                content: '',
                source: props.source
            };
        }
        return null;
    }

    componentDidMount() {
        const {source} = this.props;

        if (!source) { return; }

        fetch(source).then(
            (response) => response.text()
        ).then(
            (response) => {
                this.setState({
                    fetched: true,
                    content: response
                });
            }
        ).catch((e) => {
            this.setState({
                fetched: true,
                content: e.message
            });
        });
    }

    async render() {
        const {as: Element, insertAs} = this.data;
        const {fetched, content} = this.state;

        return (
            <>
                {!fetched && fetched !== false && (
                    <div>Loading...</div>
                )}
                {fetched === false && (
                    <div>{content}</div>
                )}
                {fetched && insertAs === 'text' && (
                    <Element>{content}</Element>
                )}
                {fetched && insertAs === 'html' && (
                    <Element dangerouslySetInnerHTML={{__html: content}}/>
                )}
            </>
        );
    }
}

interface HtmlContainerProps {
    as: 'div',
    source: null;
    insertAs: 'text';
}