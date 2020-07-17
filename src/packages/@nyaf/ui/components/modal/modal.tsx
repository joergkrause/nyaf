import JSX, { Events, Properties, CustomElement, BaseComponent } from '@nyaf/lib';

require('./modal.scss');
import Color from '../../routines/color';

@CustomElement('ui-modal')
@Properties<ModalProps>({
  open: false,
  mount: document.body,
  cls: '',
  overlayColor: '#fff',
  overlayAlpha: 1
})
@Events(['click'])
export class Modal extends BaseComponent<ModalProps> {
  async render() {
    const { cls, mount, open, overlayColor, overlayAlpha } = this.data;
    const modalBackground = Color.toRgbaString(Color.toRGBA(overlayColor, overlayAlpha));
    const style = {
      background: modalBackground
    };

    return await createPortal(
      <div className={'modal ' + cls} n-on-click={this.onClick} hidden={!open} style={style}>
        {this.children}
      </div>,
      mount
    );
  }
}

interface ModalProps {
  open: boolean;
  mount: HTMLElement;
  cls: string;
  overlayColor: string;
  overlayAlpha: number;
}
