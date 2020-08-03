import JSX, { BaseComponent, GlobalProvider, CustomElement, LifeCycle } from '@nyaf/lib';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-router')
export class RouterComponent extends BaseComponent<{ cnt: number }> {
  eventData: any;

  constructor() {
    super();
  }

  navigate(e: Event, route: string, other: string, setLink: 'yes' | 'no') {
    GlobalProvider.navigateRoute(route, 'left');
    GlobalProvider.navigateRoute(other, 'right');
    if (setLink === 'yes') {
      // remove all active
      this.querySelectorAll('a').forEach(link => link.classList.remove('active'));
      (e.target as HTMLAnchorElement).classList.add('active');
    }
  }

  async render() {
    return await (
      <>
        <ul class='nav nav-pills flex-column'>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/router/page1'>Page 1 on router with caching</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/router/page2'>Page 2 on router with caching</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#' n-on-click={(e) => this.navigate(e, '/router/page1', '/router/page2/right', 'no')}>
              Coded: Page 1 on left Page2 on right</a>
              <small>Must set active link in code, too; in the demo not set</small>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#' n-on-click={(e) => this.navigate(e, '/router/page2', '/router/page3/right', 'yes')}>
              Coded: Page 2 on left Page3 on right</a>
              <small>Must set active link in code, too; in the demo it's set, but not removed through others</small>
          </li>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/router/page2/right'>
              Page 2 on right with caching</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/router/page3/right'>
              Page 3 on right with caching</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/sc1'>
              Page 4 on right with foreced re-loading</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/sc2'>
              Page 5 on right with foreced re-loading</a>
          </li>
        </ul>
        <div class='row'>
          <div class='col'>
            <p>Click on one of the navigation links above to invoke the router logic. See results below:</p>
          </div>
        </div>
        <div class='row'>
          <div style='border: 2px dotted green' class='col-6'>
            <strong>Outlet 'left'</strong>
            <div n-router-outlet='left'></div>
          </div>
          <div style='border: 2px dashed brown' class='col-6'>
            <strong>Outlet 'right'</strong>
            <div n-router-outlet='right'></div>
          </div>
        </div>
      </>
    );
  }

}
