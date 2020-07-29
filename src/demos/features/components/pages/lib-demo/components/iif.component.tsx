import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';

interface IfProps {
  show: boolean;
}

@CustomElement('app-if')
  @Properties<IfProps>({ show: false })
export class IfComponent extends BaseComponent<IfProps> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <>
        <div class='alert alert-success'>
          <span n-if={this.data.show}>Shows on True</span>
          <span n-if={!this.data.show}>Shows on False</span>
        </div>
        <button type='button' n-on-click={(e) => this.set(e, true)}>Set True</button>
        <button type='button' n-on-click={(e) => this.set(e, false)}>Set False</button>
      </>
    );
  }

  public set(e: Event, val: boolean) {
    this.data.show = val;
  }

}
