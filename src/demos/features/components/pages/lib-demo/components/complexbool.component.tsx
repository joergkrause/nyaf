import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-complex-bool')
@Properties<{ demo: boolean }>({ demo: false })
export class ComplexBoolComponent extends BaseComponent<{ demo: boolean }> {

  constructor() {
    super();
  }


  async render() {
    return await (
      <>
        <div>
          A boolean value will be send as attribute and rendered properly.
        </div>
        <div class='badge badge-info'>{super.data.demo ? 'YES' : 'NO'}</div>
      </>
    );
  }
}
