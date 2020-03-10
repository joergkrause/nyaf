import JSX, { BaseComponent, Properties, CustomElement, ShadowDOM } from '@nyaf/lib';

export interface SlotTabProps {
  targetId: string;
}

@CustomElement('app-slot-tab')
@Properties<SlotTabProps>({ targetId: '' })
export class SlotTabComponent extends BaseComponent<SlotTabProps> {

  private _title: string;
  private _targetId: string;

  constructor() {
    super();
  }

  render() {
    return (
      <div id={this.targetId}>
        [{this.innerHTML}]
      </div>
    );
  }

  public get title() {
    return this._title;
  }

  public set title(value) {
    this._title = value;
  }

  public get targetId() {
    return this._targetId;
  }

  public set targetId(value) {
    this._targetId = value;
  }

}
