import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


@CustomElement('app-about')
export class AboutComponent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <div style='position: relative; top: 150px;' class='container'>
        <style>
          {`nav {
              background-color: black !important;
            }
            footer {
              position: fixed;
              width: 100%;
              bottom: 0;
            }
            `}
        </style>
        <h2>About</h2>
        <p>
          This project was started in 2019 by Joerg &lt;IsAGeek&gt; Krause as a side project for an electron app. There was no need for a full blown
          framework, so using Web Components was a good choice. It turns out, that some pieces require repeating steps. That leads to some functions.
          NYAF is a collection of these helpful functions encapsulated as a package.
        </p>
        <h3 class='n-bind:class:value'>Imprint</h3>
        <p>
          <addr>Jörg Krause</addr>
          <addr>Hafersteig 113</addr>
          <addr>12683 Berlin</addr>
          <addr>Germany</addr>
          <addr>T 0172/3243189</addr>
        </p>
      </div>
    );
  }
}
