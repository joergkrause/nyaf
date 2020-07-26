
import JSX, { BaseComponent, CustomElement, ShadowDOM, Properties } from '@nyaf/lib';

@CustomElement('app-slot-tab')
@ShadowDOM(true)
@Properties<{ active: boolean }>({ active: false })
export class SlotTabComponent extends BaseComponent<{ active: boolean }> {

  private _title: string;

  constructor() {
    super();
    this.classList.add('hide');
  }

  async render() {
    return await (
      <div id={this.getAttribute('data-id')}>
        <slot></slot>
      </div>
    );
  }

  public get title() {
    return this._title;
  }

  public set title(value) {
    this._title = value;
  }

  public get active() {
    return this.data.active;
  }

  public set active(value) {
    this.data.active = value;
  }

}
