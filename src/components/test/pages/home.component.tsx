import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

// Step 1: Create the Components active parts
@CustomElement('app-home')
export class HomeComponent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <h2>NYAF Demo and Docs</h2>
        <p>NYAF is a simple frontend library that simplifies the usage of native Web Components.</p>
        <p>
          It follows a philosophie that got somehow lost in past years &ndash; instead of adding more an more functions to a frontend framework, it's
          much better to extend th e developer's toolchain and try to keep the result as simple as possible, using native functions wherever possible.
        </p>
        <p>The tooling of NYAF has three main ingredients:</p>
        <ol>
          <li>Using TypeScript is mandatory</li>
          <li>Using JSX/TSX for components is the preferred way to create those</li>
          <li>Using decorators for following the "separation of concerns" principle</li>
        </ol>
        <p>The result is outstanding. Very easy to write components, very small code, very fast execution.</p>
        <h3>Template techniques</h3>
        <p>Template are powerful und can handle special instruction, it's a bit looking like a Vue.</p>
        <p>
          Templates are written in JSX, and this part looks much like React. However, state and attribute management is put together and hence much
          easier to handle than in React.
        </p>
        <p>
          Components <i>can</i>> us a shadow DOM. This is an option, not enforced. It's just a decorator and it's a "per component" decision.
        </p>
        <p>Decorators handle all definitions, and this is looking a lot like Angular.</p>
        <h3>Best Bread</h3>
        <p>
          NYAF takes the best from everything and strips all parts that a browser can handle natively. Especially there is <strong>no</strong>...:
        </p>
        <ul>
          <li>
            ...AJAX/HTTP module. Use <code>fetch</code> instead.
          </li>
          <li>...Animation module. Use CSS 3 animation.</li>
          <li>...Dependency Injection. Use TypeScript's capabilities to deal with services; there is a simple service manager included.</li>
        </ul>
        <p>There is full support for</p>
        <ul>
          <li>WebPack</li>
          <li>TypeScript</li>
          <li>HTML 5 DOM API</li>
        </ul>
        <p>
          There is no dependency to anything, too. 
        </p>
      </>
    );
  }
}
