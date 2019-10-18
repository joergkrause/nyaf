import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

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


  render() {
    return (
      <>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" n-link="active" href="#/router/page1">Page 1 on router</a>
          </li>
          <li>
            <a class="nav-link" n-link="active" href="#/router/page2">Page 2 on router</a>
          </li>
          <li>
            <a class="nav-link" n-link="active" href="#/router/page2/other">Page 2 on other</a>
          </li>
          <li>
            <a class="nav-link" n-link="active" href="#/router/page3/other">Page 3 on other</a>
          </li>
        </ul>
        <div class="alert alert-info">
          Advanced router with named outlets to move components around. Use this kind of configuration:<br></br>
        </div>
        <h3>Router Outlet</h3>
        <div class="alert alert-light">
          This is a named outlet "router" that is set using the <b>outlet</b> property in router configuration:<br></br>
          <pre>{'&lt;div n&ndash;router&ndash;outlet="router"&gt;&lt;/div&gt;'}
          </pre>
        </div>
        <div n-router-outlet="router"></div>
        <h3>Named Outlet</h3>
        <div class="alert alert-light">
          This is a named outlet "other" that is set using the <b>outlet</b> property in router configuration.<br></br>
          <pre>{'&lt;div n&ndash;router&ndash;outlet="other"&gt;&lt;/div&gt;'}
          </pre>
        </div>
        <div n-router-outlet="other"></div>
      </>
    );
  }
}