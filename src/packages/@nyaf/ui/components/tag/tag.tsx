import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./tag.scss');

@CustomElement('ui-tag')
@Properties<TagProps>({
  cls: '',
  clsTitle: '',
  clsRemover: ''
})
@Events(['click'])
export class Tag extends BaseComponent<TagProps> {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick (e) {
        this.props.onClick(e);
    }

    render() {
        const {cls, clsTitle, clsRemover, ...addProps} = this.data;
        return (
            <div className={'tag ' + cls} {...addProps}>
                <span className={'title ' + clsTitle}>{this.children}</span>
                <span className={'remover ' + clsRemover} onClick={this.onClick}>&times;</span>
            </div>
        );
    }
}

interface TagProps {
    cls: '',
    clsTitle: '',
    clsRemover: '',
    onClick: () => {};
}
