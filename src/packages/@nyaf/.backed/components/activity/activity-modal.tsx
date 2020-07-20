import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
import './activity.css';

@CustomElement('ui-activity-modal')
@Properties<ActivityModalProps>({
  open: false,
  overlayColor: '#ffffff',
  overlayAlpha: 1
})
@Events(['close'])
export class ActivityModal extends BaseComponent<ActivityModalProps> {

  constructor() {
    super();
  }

  overlayClick(e) {
    this.dispatch('close', {});
  }

  async render() {
    const { open, overlayColor, overlayAlpha, ...props } = this.data;

    return await (
      <ui-body>
        {open && (
          <div className={'overlay'} style={{ backgroundColor: overlayColor, opacity: overlayAlpha }} n-on-click={this.overlayClick}>
            <ui-activity {...props} cls={'activity-modal'} />
          </div>
        )}
      </ui-body>
    );
  }
}

interface ActivityModalProps {
  open: boolean;
  overlayColor: string;
  overlayAlpha: number;
}
