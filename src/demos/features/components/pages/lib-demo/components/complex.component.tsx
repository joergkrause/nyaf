import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-complex')
@Properties<{ demo: any }>({ demo: {} })
export class ComplexComponent extends BaseComponent<{ demo: any }> {

  constructor() {
    super();
  }


  async render() {
    return await (
      <>
        <div>
          A complex value (object) will be send as attribute and rendered properly.
        </div>
        <div class='badge badge-info'>{this.data.demo.length}</div>
        <div class='badge badge-primary'>{JSON.stringify(this.data.demo)}</div>
      </>
    );
  }
}
