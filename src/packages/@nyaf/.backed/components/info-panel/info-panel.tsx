import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
require('./info-panel.scss');

@CustomElement('ui-infopanel-title')
@Properties<InfoPanelTitleProps>({
  cls: '',
})
export class InfoPanelTitle extends BaseComponent<InfoPanelTitleProps> {
  async render() {
    return (
      <div className={'info-panel-header ' + this.data.cls}>{this.children}</div>
    );
  }
}

interface InfoPanelTitleProps {
  cls?: string;
}

@CustomElement('ui-infopanel-content')
@Properties<InfoPanelContentProps>({
  cls: '',
})
export class InfoPanelContent extends BaseComponent<InfoPanelContentProps> {
  async render() {
    return (
      <div className={'info-panel-content ' + this.data.cls}>{this.children}</div>
    );
  }
}

interface InfoPanelContentProps {
  cls?: string;
}

@CustomElement('ui-infopanel-footer')
@Properties<InfoPanelFooterProps>({
  cls: ''
})
export class InfoPanelFooter extends BaseComponent<InfoPanelFooterProps> {
  async render() {
    return (
      <div className={'info-panel-footer ' + this.data.cls}>{this.children}</div>
    );
  }
}

interface InfoPanelFooterProps {
  cls?: string;
}

@CustomElement('ui-infopanel')
@Properties<InfoPanelProps>({
  cls: ''
})
export class InfoPanel extends BaseComponent<InfoPanelProps> {
  async render() {
    const { cls } = this.data;

    return await (
      <div className={'info-panel ' + cls}>
        {this.children}
      </div>
    );
  }
}

interface InfoPanelProps {
  cls?: string;
}
