import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


@CustomElement('app-about')
export class AboutComponent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <div class='container main-adjust'>
        <div class='row'>
          <div class='col'>
            <h2>About</h2>
            <p>
              This project was started in 2018 by Joerg &lt;IsAGeek&gt; Krause as a side project for an electron app. There was no need for a full blown
              framework. I decided to give native Web Components a chance. It was a good choice, because most functions where easy to implement using plain
              HTML 5 API. It was also a very good decision to use TypeScript from the beginning. It's worth to mention that before this I worked on several
              customer projects using Angular and the way Angular works and enforces a structure of a project is a tremendious advantage. However, if you
              know the best structure and have in-depth knowledge of the APIs, the power of a framework is not that impressive anymore. They weight and
          footprint still is, though.<br></br>
          It turns out, that some pieces require repeating steps. That leads to some functions. That was the beginning of a small library. @nyaf was born
          end of 2018. Nowadays @nyaf is a collection of these helpful functions encapsulated as a package. Two more libraries add two very helpful features,
          @nyaf/forms provides data binding and validation and @nyaf/store a simple flux store.
        </p>
            <h3>Imprint</h3>
            <p>
              <addr>Jörg Krause</addr>
              <addr>Hafersteig 113</addr>
              <addr>12683 Berlin</addr>
              <addr>Germany</addr>
              <addr>T 0172/3243189</addr>
              <addr>https://www.joergkrause.de</addr>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
