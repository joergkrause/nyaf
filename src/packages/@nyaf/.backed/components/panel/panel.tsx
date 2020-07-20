import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
import { ViewModel, IModel, ModelBinder } from '@nyaf/forms';
require('./panel.scss');

class PanelModel {
  open: boolean;
  initState: boolean;
}

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
@ViewModel<PanelModel>(PanelModel)
export class Panel extends BaseComponent<PanelProps> implements IModel<PanelModel> {

  constructor() {
    super();
    this.model.scope.open = this.data.open;
    this.model.scope.initState = this.data.open;
    this.togglePanelState = this.togglePanelState.bind(this);
  }
  model: ModelBinder<PanelModel>;

  static getDerivedStateFromProps(props, state) {
    if (props.open !== state.initState) {
      return {
        open: props.open,
        initState: props.open
      };
    }
    return null;
  }

  togglePanelState() {
    this.model.scope.open = !this.model.scope.open;
  }

  async render() {
    const { caption, icon, iconPrefix, image, speed, collapsible, open: panelState, customButtons,
      cls, clsTitle, clsCaption, clsIcon, clsContent, clsCustomButton, clsDropdownToggle } = this.data;
    const { open } = this.model.scope;
    const transition = `height ${speed}ms cubic-bezier(.4, 0, .2, 1)`;
    const iconClass = `icon ${clsIcon}`;

    return (
      <div className={'panel ' + cls}>
        <div className={'panel-title ' + clsTitle}>
          <div className={'caption ' + clsCaption}>{caption}</div>

          {icon !== '' && (
            <ui-icon name={icon} prefix={iconPrefix} cls={iconClass} />
          )}

          {image !== '' && (
            <img src={image} alt='' className={iconClass} />
          )}

          {collapsible && (
            <span className={'dropdown-toggle marker-center ' + (open ? ' active-toggle ' : '') + clsDropdownToggle} onClick={this.togglePanelState} />
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
  caption: string;
  icon: string;
  iconPrefix: string;
  image: string;
  collapsible: boolean;
  speed: number;
  open: boolean;
  customButtons: {};
  cls: string;
  clsTitle: string;
  clsCaption: string;
  clsIcon: string;
  clsContent: string;
  clsCustomButton: string;
  clsDropdownToggle: string;
}
