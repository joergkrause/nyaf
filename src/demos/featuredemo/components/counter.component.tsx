import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';

interface CounterProps { cnt: number; }

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-counter')
@Properties<CounterProps>({ cnt: 0})
export class CounterComponent extends BaseComponent<CounterProps> {
  eventData: any;

  constructor() {
    super();
    super.setData('cnt',  10);
  }

  clickMeAdd(v: number, param: number = 1) {
    console.log('Counter Element Click');
    super.data.cnt += param;
  }

  clickMeSub(v: number, param: number = 1) {
    console.log('Counter Element Click');
    super.data.cnt -= param;
  }

  async render() {
    return await (
      <>
        <div>
          <button type='button' n-on-click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' n-on-click={e => this.clickMeSub(e)}>
            Sub 1
          </button>
        </div>
        <div>
          <button type='button' n-on-click={e => this.clickMeAdd(e, 5)}>
            Add 5
          </button>
          <button type='button' n-on-click={e => this.clickMeSub(e, 5)}>
            Sub 5
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{ super.data.cnt }</pre>
      </>
    );
  }
}
