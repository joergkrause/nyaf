import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {
  constructor() {
    super();
  }

  async render() {
    return await (
      <>
        <nav class='navbar navbar-expand-lg navbar-light fixed-top' id='mainNav'>
          <div class='container'>
            <a class='navbar-brand js-scroll-trigger' href='#/home'>@nyaf</a>
            <button class='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
              Menu
                    <i class='fas fa-bars'></i>
            </button>
            <div class='collapse navbar-collapse' id='navbarResponsive'>
              <ul class='navbar-nav ml-auto'>
                <li class='nav-item'><a class='nav-link js-scroll-trigger' href='#/docu'>Quick Overview</a></li>
                <li class='nav-item'><a class='nav-link js-scroll-trigger' href='manual/index.html'>Full Manual	&#x1f517;</a></li>
                <li class='nav-item dropdown'>
                  <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    API Documentation
              </a>
                  <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <a class='dropdown-item' href='apidoc/lib/index.html' target='apidoc'>Base Library API &#x1f517;</a>
                    <a class='dropdown-item' href='apidoc/forms/index.html' target='apidoc'>Forms &amp; Binding API &#x1f517;</a>
                    <a class='dropdown-item' href='apidoc/store/index.html' target='apidoc'>Flux Store API &#x1f517;</a>
                  </div>
                </li>
                <li class='nav-item dropdown'>
                  <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    Demo Applications
              </a>
                  <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <a class='dropdown-item' href='#/libdemo' n-link='active'>Base Library Demo</a>
                    <a class='dropdown-item' href='#/formsdemo' n-link='active'>Forms Demo</a>
                    <a class='dropdown-item' href='#/storedemo' n-link='active'>Store Demo</a>
                    <div class='dropdown-divider'></div>
                    <a class='dropdown-item' href='#/router' n-link='active'>Router Demo (part of base lib)</a>
                  </div>
                </li>
                <li class='nav-item'><a class='nav-link js-scroll-trigger' href='#/about'>About</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div n-router-outlet ></div>
      </>

    );
  }
}
