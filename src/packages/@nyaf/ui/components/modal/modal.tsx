import JSX, { Events, Properties, CustomElement, BaseComponent } from '@nyaf/lib';

require('./modal.scss');
import Color from '../../routines/color';

@CustomElement('ui-modal')
@Properties<ModalProps>({
  open: false,
  cls: '',
  overlayColor: '#fff',
  overlayAlpha: 1
})
@Events(['click'])
export class Modal extends BaseComponent<ModalProps> {

  constructor() {
    super();
  }

  onClick(e: Event) {
    this.dispatch('click', {});
  }

  async render() {
    const { cls, open, overlayColor, overlayAlpha } = this.data;
    const modalBackground = Color.toRgbaString(Color.toRGBA(overlayColor, overlayAlpha));
    const style = {
      background: modalBackground
    };

    const createPortal = (
      <div className={'modal ' + cls} n-on-click={this.onClick} hidden={!open} style={style}>
        {this.children}
      </div>
    );

    document.body.appendChild(createPortal);

    return await (null);
  }
}

interface ModalProps {
  open: boolean;
  cls: string;
  overlayColor: string;
  overlayAlpha: number;
}
