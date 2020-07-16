import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {
  constructor() {
    super();
  }

  async render() {
    return await (
      <section>
        <ul class='nav nav-pills'>
          <li class='nav-item'>
            <a class='nav-link' href='#/' n-link='active'>
              Home
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/docu' n-link='active'>
              Quick
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='apidoc/index.html' target='apidoc'>
              API &#x1f517;
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='manual/index.html' target='manual'>
              Manual 	&#x1f517;
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/demo' n-link='active'>
              @nyaf/lib
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/router' n-link='active'>
              @nyaf/store
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/contact' n-link='active'>
              @nyaf/forms
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/about' n-link='active'>
              About
            </a>
          </li>
        </ul>
        <div n-router-outlet />
      </section>
    );
  }
}
