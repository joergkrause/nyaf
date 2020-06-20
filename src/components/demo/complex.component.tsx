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
        <pre style='border: 1px solid gray;'>{super.data.demo.length}</pre>
        <pre style='border: 1px solid gray;'>{JSON.stringify(super.data.demo)}</pre>
      </>
    );
  }
}
