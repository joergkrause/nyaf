import JSX, { BaseComponent, GlobalProvider, CustomElement, LifeCycle, InjectService } from '@nyaf/lib';
import { HighlightService } from '../../../services/highlight.service';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-router-demo')
@InjectService('highlight', HighlightService)
export class RouterDemoComponent extends BaseComponent<{ cnt: number }> {
  eventData: any;

  constructor() {
    super();
    super.setData('cnt', 10);
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
    GlobalProvider.navigateRoute(route, 'router');
    GlobalProvider.navigateRoute(other, 'other');
  }

  async render() {
    return await (
      <div class='container main-adjust'>
        <app-page-intro header='Router Demo' small='Routing with the base library'></app-page-intro>
        <div class='row' >
          <div class='col-10' data-spy='scroll' data-target='#demonav' data-offset='100'>
            <h3 class='display-4' id='router' source='router'>Routing and Child Routing</h3>
            <app-slot-tabs>
              <app-slot-tab title='Explanation'>
                <div class='alert alert-info mb-5'>
                  <p>
                    @nyaf provides an advanced router with named outlets to move components around.
                  You can define any number of targets using hyperlinks and the <code>n-link</code> attribute you can
                  easily define router aware links. Use a value to define a class for the currently active link. For
                  all other use cases use coded navigation. With coded navigation you can:
                  </p>
                  <ul>
                    <li>Use any sort of trigger</li>
                    <li>Trigger multiple outlets ast the same time with same or different components</li>
                  </ul>
                  <p>
                    To know what's going on the router module fires an event before (cancellable) and after the navigation.
                    The components shown by router are regular components, they must have tag name and must be registered as any other component.
                    There is no explicit master/child concept, any named router or any kind of path will do it. It's up to you
                    to handle paths with specific parts as "child" routes.
                  </p>
                  <h3>Router Outlet Example</h3>
                  <p>
                    Use this kind of configuration:<br></br>
                  This is a named outlet "left" that is set using the <b>outlet</b> property in router configuration:<br></br>
                    <pre>{'&lt;div n&ndash;router&ndash;outlet="left"&gt;&lt;/div&gt;'}
                    </pre>
                  </p>
                  <h3>Route definition</h3>
                  <p>
                    In the global provider you must register your routes. Also, on top level must at least one default outlet.
                    It's not necessary to use it later, but it must be available outside a shadow DOM. Apart from this, a simple array
                    is all you need to active the routing like this (from the demo app):
                </p>
                  <pre><code>
                    {`
const routes: Routes = {
  // this partt controls the demo itself
  '/': { component: HomeComponent },
  '/home': { component: HomeComponent },
  '/docu': { component: DocuComponent, data: { notlocal: true } },
  '/about': { component: AboutComponent },
  '/libdemo': { component: LibDemoComponent },
  '/storedemo': { component: StoreDemoComponent },
  '/formsdemo': { component: FormsDemoComponent },
  '/router': { component: RouterDemoComponent },
  // this part is a child router to demoing the router
  '/router/page1': { component: Page1Component, outlet: 'left' },
  '/router/page2': { component: Page2Component, outlet: 'left' },
  '/router/page2/right': { component: Page2Component, outlet: 'right' },
  '/router/page3/right': { component: Page3Component, outlet: 'right' },
  '/sc1': { component: Page4Component, outlet: 'right', forced: true },
  '/sc2': { component: Page5Component, outlet: 'right', forced: true },
  '**': { component: HomeComponent }
};`}
                  </code></pre>
                  <p>
                    The bootstrapper could look like this, then (component registration ommitted for brevity)
                    </p>
                  <pre>
                    <code>
                      {`
GlobalProvider.bootstrap({
  // register all components
  components: [],
  // register the routes
  routes
});
                        `}
                    </code>
                  </pre>
                  <p><b>Pro Tip:</b> To "empty" an outlet create a component that returns <code>null</code> and add it.</p>
                </div>
              </app-slot-tab>
              <app-slot-tab title='Playground'>
                <app-router></app-router>
              </app-slot-tab>
              <app-slot-tab title='Demo Markup'>
              </app-slot-tab>
              <app-slot-tab title='Source Code'>
              </app-slot-tab>
            </app-slot-tabs>
            <hr />
          </div>
          <div class='col-2' style='position: fixed; right: 15px;'>
            <nav id='demonav'>
              <ul class='nav flex-column'>
                <li class='nav-item'>
                  <a class='nav-link' href='#router'>Router Demo</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  lifeCycle(lc: LifeCycle) {
    if (lc === LifeCycle.Load) {
      this.services<HighlightService>('highlight').setup(this);
    }
  }

}
