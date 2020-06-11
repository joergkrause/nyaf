import JSX, { BaseComponent, GlobalProvider, CustomElement } from '@nyaf/lib';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-router')
export class RouterComponent extends BaseComponent<{ cnt: number }> {
  eventData: any;

  constructor() {
    super();
    super.setData('cnt',  10);
  }

  clickMeAdd(v: number) {
    console.log('Counter Element Click');
    super.setData('cnt', super.data.cnt + 1);
  }

  clickMeSub(v: number) {
    console.log('Counter Element Click');
    super.setData('cnt', super.data.cnt - 1);
  }

  navigate(e: Event, route: string, other: string) {
    GlobalProvider.navigateRoute(route, "router");
    GlobalProvider.navigateRoute(other, "other");
  }

  async render() {
    return await (
      <>
        <app-contact></app-contact>
        <ul class='nav nav-pills'>
          <li class='nav-item'>
            <a class='nav-link' n-link='active' href='#/router/page1'>Page 1 (main)</a>
          </li>
          <li>
            <a class='nav-link' n-link='active' href='#/router/page2'>Page 2 (main))</a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#' n-on-click={(e) => this.navigate(e, '/router/page1', '/router/page2/other')}>Page 1 (coded)</a>
          </li>
          <li>
            <a class='nav-link' href='#' n-on-click={(e) => this.navigate(e, '/router/page2', '/router/page3/other')}>Page 2 (coded)</a>
          </li>
          <li>
            <a class='nav-link' n-link='active' href='#/router/page2/other'>Page 2 (other)</a>
          </li>
          <li>
            <a class='nav-link' n-link='active' href='#/router/page3/other'>Page 3 (other)</a>
          </li>
          <li>
            <a class='nav-link' n-link='active' href='#/sc1'>Store Instance 1</a>
          </li>
          <li>
            <a class='nav-link' n-link='active' href='#/sc2'>Store Instance 2</a>
          </li>
        </ul>
        <div class='alert alert-info'>
          Advanced router with named outlets to move components around. Use this kind of configuration:<br></br>
        </div>
        <h3>Router Outlet</h3>
        <div class='alert alert-light'>
          This is a named outlet "router" that is set using the <b>outlet</b> property in router configuration:<br></br>
          <pre>{'&lt;div n&ndash;router&ndash;outlet="router"&gt;&lt;/div&gt;'}
          </pre>
        </div>
        <div n-router-outlet='router'></div>
        <h3>Named Outlet</h3>
        <div class='alert alert-light'>
          This is a named outlet "other" that is set using the <b>outlet</b> property in router configuration.<br></br>
          <pre>{'&lt;div n&ndash;router&ndash;outlet="other"&gt;&lt;/div&gt;'}
          </pre>
        </div>
        <div n-router-outlet='other'></div>
      </>
    );
  }
}
