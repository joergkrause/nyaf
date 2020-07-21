
import JSX, { BaseComponent, CustomElement, ShadowDOM, UseParentStyles, LifeCycle } from '@nyaf/lib';

@CustomElement('app-slot-tab')
@ShadowDOM(true)
export class SlotTabComponent extends BaseComponent<{}> {

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

}
