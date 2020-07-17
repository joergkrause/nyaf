import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
require('./panel.scss');

@CustomElement('ui-panel')
@Properties<PanelProps>({
  caption: '',
  icon: '',
  iconPrefix: 'mif-',
  image: '',
  collapsible: true,
  speed: 100,
  open: true,
  customButtons: {},
  cls: '',
  clsTitle: '',
  clsCaption: '',
  clsIcon: '',
  clsContent: '',
  clsCustomButton: '',
  clsDropdownToggle: ''
})
export class Panel extends BaseComponent<PanelProps> {
    constructor() {
        super();
        this.state = {
            open: props.open,
            initState: props.open
        };
        this.togglePanelState = this.togglePanelState.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.open !== state.initState) {
            return {
                open: props.open,
                initState: props.open
            };
        }
        return null;
    }

    togglePanelState () {
        this.setState({
            open: !this.state.open
        });
    }

    async render() {
        const {caption, icon, iconPrefix, image, speed, collapsible, open: panelState, customButtons, cls, clsTitle, clsCaption, clsIcon, clsContent, clsCustomButton, clsDropdownToggle} = this.data;
        const {open} = this.state;
        const transition = `height ${speed}ms cubic-bezier(.4, 0, .2, 1)`;
        const iconClass = `icon ${clsIcon}`;

        return(
            <div className={'panel ' + cls}>
                <div className={'panel-title ' + clsTitle}>
                    <div className={'caption ' + clsCaption}>{caption}</div>

                    {icon !== '' && (
                        <ui-icon name={icon} prefix={iconPrefix} cls={iconClass}/>
                    )}

                    {image !== '' && (
                        <img src={image} alt='' className={iconClass}/>
                    )}

                    {collapsible && (
                        <span className={'dropdown-toggle marker-center ' + (open ? ' active-toggle ' : '') + clsDropdownToggle} onClick={this.togglePanelState}/>
                    )}
                </div>

                <ui-collapse isOpen={collapsible ? open : true} className={'panel-content'} transition={transition}>
                    <div className={'panel-content-inner ' + clsContent}>
                        {this.children}
                    </div>
                </ui-collapse>

            </div>
        );
    }
}

interface PanelProps {
    caption: '',
    icon: '',
    iconPrefix: 'mif-',
    image: '',
    collapsible: true;
    speed: 100;
    open: true;
    customButtons: {};
    cls: '',
    clsTitle: '',
    clsCaption: '',
    clsIcon: '',
    clsContent: '',
    clsCustomButton: '',
    clsDropdownToggle: ''
}