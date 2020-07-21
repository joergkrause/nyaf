import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

@CustomElement('app-main')
export class MainComponent extends BaseComponent<{}> {
  constructor() {
    super();
  }

  async render() {
    return await (
      <section class='row'>
        <div class='col'>
          <nav class='navbar navbar-expand-lg navbar-light bg-light'>
            <a class='navbar-brand' href='#'>@nyaf</a>
            <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
              <span class='navbar-toggler-icon'></span>
            </button>

            <div class='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul class='navbar-nav mr-auto'>
                <li class='nav-item active'>
                  <a class='nav-link' href='#/' n-link='active'>
                    Home
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='#/docu' n-link='active'>
                    Quick Overview
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href='manual/index.html' target='manual'>
                    Manual 	&#x1f517;
                  </a>
                </li>
                <li class='nav-item dropdown'>
                  <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    API Documentation
                  </a>
                  <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <a class='dropdown-item' href='apidoc/lib/index.html' target='apidoc'>Base Library API &#x1f517;</a>
                    <a class='dropdown-item' href='apidoc/forms/index.html' target='apidoc'>Forms &amp; Binding API &#x1f517;</a>
                    <a class='dropdown-item' href='apidoc/store/index.html' target='apidoc'>Flux Store API &#x1f517;</a>
                    <div class='dropdown-divider'></div>
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
                <li class='nav-item'>
                  <a class='nav-link' href='#/about' n-link='active'>
                    About
                  </a>
                </li>
              </ul>
              <form class='form-inline my-2 my-lg-0'>
                <input class='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search'></input>
                <button class='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
              </form>
            </div>
          </nav>
          <div n-router-outlet />
        </div>
      </section >
    );
  }
}
