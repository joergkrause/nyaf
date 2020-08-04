import JSX, { BaseComponent, CustomElement } from '@nyaf/lib';

@CustomElement('app-root')
export class RootComponent extends BaseComponent<any> {

  async render() {
    return await (
      <>
        <h1>Welcome @nyaf!</h1>
        <p>This is a Web Component rendered with @nyaf.</p>
        <p>To start, create components and add to <i>main.ts</i></p>
      </>
    );
  }


}
