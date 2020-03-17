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


  render() {
    return (
      <>
        <pre style='border: 1px solid gray;'>{super.data.demo.length}</pre>
      </>
    );
  }
}
