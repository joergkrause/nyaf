import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./dialog.scss');

@CustomElement('ui-dialog')
@Properties<DialogProps>({
  closeButton: true,
  open: false,
  title: '',
  actions: [],
  actionClickClose: true,
  modal: true,
  overlayColor: '#ffffff',
  overlayAlpha: 1,
  speed: .4,
  width: 'auto',
  height: 'auto',
  contentHeight: 'auto',
  cls: '',
  clsTitle: '',
  clsContent: '',
  clsActions: ''
})
@Events(['close', 'actionclick'])
export class Dialog extends BaseComponent<DialogProps> {

  private dialog: HTMLElement;
  private actions: any[];

  constructor() {
    super();

    this.actions = [];

    this.actions = this.data.actions.map((el, index) => {
      return (
        <ui-button {...el} key={index} n-on-click={this.actionButtonClick} />
      );
    });

    this.onClose = this.onClose.bind(this);
    this.actionButtonClick = this.actionButtonClick.bind(this);
  }

  actionButtonClick(e: Event) {
    this.dispatch('actionclick', {});
    this.onClose();
  }

  onClose() {
    this.dispatch('close', {});
  }

  async render() {
    const { open, title, closeButton, modal, overlayColor, overlayAlpha, speed, cls, clsTitle, clsContent, clsActions, height, width, contentHeight } = this.data;

    return (
      <ui-body>
        {modal && open && (
          <div className={'overlay'} style={{ backgroundColor: overlayColor, opacity: overlayAlpha }}>{''}</div>
        )}

        <div className={'dialog-wrapper'} style={{
          transition: `transform ${speed}s, opacity ${speed}s`,
          transform: open ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: open ? 1 : 0,
        }}>
          <div className={'dialog ' + cls} ref={this.dialog} style={{
            height: height,
            width: width,
          }}>

            {closeButton && (
              <ui-button cls={'square closer'} onClick={this.onClose} />
            )}

            <div className={'dialog-title ' + clsTitle}>{title}</div>
            <div className={'dialog-content ' + clsContent} style={{ height: contentHeight }}>{this.children}</div>

            {this.actions.length > 0 && (
              <div className={'dialog-actions ' + clsActions}>{this.actions}</div>
            )}

          </div>
        </div>
      </ui-body>
    );
  }
}

interface DialogProps {
  closeButton: boolean;
  open: boolean;
  title: string;
  actions: any[];
  actionClickClose: boolean;
  modal: boolean;
  overlayColor: string;
  overlayAlpha: number;
  speed: number;
  width: string;
  height: string;
  contentHeight: string;
  cls: string;
  clsTitle: string;
  clsContent: string;
  clsActions: string;
}
