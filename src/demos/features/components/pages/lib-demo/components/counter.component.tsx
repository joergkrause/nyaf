import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';

interface CounterProps { cnt: number; }

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-counter')
@Properties<CounterProps>({ cnt: 0})
export class CounterComponent extends BaseComponent<CounterProps> {

  constructor() {
    super();
  }

  clickMeAdd(v: number, param: number = 1) {
    this.data.cnt += param;
  }

  clickMeSub(v: number, param: number = 1) {
    this.data.cnt -= param;
  }

  async render() {
    return await (
      <>
        <div>
          <p>
            This is a simple event call. The syntax allows the editor to detect the target method.
          </p>
          <button type='button' class='btn btn-success' n-on-click={this.clickMeAdd}>
            Add 1
          </button>
          <button type='button' class='btn btn-warning' n-on-click={this.clickMeSub}>
            Sub 1
          </button>
        </div>
        <div>
          <p>
            Another syntax, used to provide a static value. Be aware, that the value is treated as 'string' internally.
          </p>
          <button type='button' class='btn btn-outline-success' n-on-click={e => this.clickMeAdd(e, 5)}>
            Add 5
          </button>
          <button type='button' class='btn btn-outline-warning'n-on-click={e => this.clickMeSub(e, 5)}>
            Sub 5
          </button>
        </div>
        <div class='badge badge-success'>The current value is: { this.data.cnt }</div>
      </>
    );
  }
}
