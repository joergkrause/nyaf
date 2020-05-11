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
              Quickstart
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='documentation/index.html' target='tech-docu'>
              Technical Documentation (new tab)
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/about' n-link='active'>
              About
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/demo' n-link='active'>
              Component Demo
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/router' n-link='active'>
              Router (SPA Demo)
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#/contact' n-link='active'>
              Contact
            </a>
          </li>
        </ul>
        <div n-router-outlet />
      </section>
    );
  }
}
