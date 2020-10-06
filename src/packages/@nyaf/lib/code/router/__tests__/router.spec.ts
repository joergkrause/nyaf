import { Router } from '../router';
import { Routes, RouteDefinition } from '../routes';
import { BaseComponent } from '../../../components/base.component';
import { CustomElement } from '../../../decorators/customelement.decorator';

describe('router', () => {

  @CustomElement('mock-component')
  class MockComponent extends BaseComponent {
    constructor() {
      super();
    }
    render() {
      return '<div>Test</div>';
    }
  }

  let router: Router = null;

  const mockRoutes: RouteDefinition =
  {
    '/home': { component: MockComponent },
    '/wrong': { component: null }
  };

  beforeAll(() => {
    const outlet = document.createElement('div');
    outlet.setAttribute('n-router-outlet', '');
    document.body.appendChild(outlet);
    customElements.define('mock-component', MockComponent);
  });

  beforeEach(() => {
    router = Router.getInstance(true);
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('register routes', () => {
    router.registerRouter(mockRoutes);
    expect(router).not.toBeNull();
    const expectSetting = [
      {
        "action": { "component": null },
        "legacy": "/wrong",
        "map": [],
        "path": /^\/wrong$/
      },
      {
        "action": { "component": MockComponent },
        "legacy": "/home",
        "map": [],
        "path": /^\/home$/
      }];
    expect(router['routes']).toEqual(expectSetting);
  });

  it('navigates correct route', () => {
    router.registerRouter(mockRoutes);
    router.navigateRoute('/home');
    const targetSet = document.querySelector('div[n-router-outlet]').innerHTML;
    expect(targetSet).toEqual('<mock-component n-type-routeparams=\"array\" routeparams=\"[]\" n-type-routerparams=\"object\"><div>Test</div></mock-component>');
  });

  it('navigates wrong route', () => {
    router.registerRouter(mockRoutes);
    const error = () => {
      router.navigateRoute('/xxx');
    };
    expect(error).toThrowError('Route not found');
  });

  it('navigates route with no component', () => {
    router.registerRouter(mockRoutes);
    const error = () => {
      router.navigateRoute('/wrong');
    };
    expect(error).toThrowError('Route found but has no component and default route is not defined');
  });

  it('set outlet', () => {
    expect(router).not.toBeNull();
  });

  it('getRoute internal', () => {
    router.registerRouter(mockRoutes);
    const internalRoute = router['getRoute']('/home');
    expect(internalRoute).toEqual({
      "action": { "component": MockComponent },
      "legacy": "/home",
      "map": [],
      "path": /^\/home$/
    });
  });

  it('getRoute internal fail', () => {
    router.registerRouter(mockRoutes);
    const internalRoute = router['getRoute']('/notthere');
    expect(internalRoute).toEqual(false);
  });

  it('getDefaultRoute internal no default', () => {
    router.registerRouter(mockRoutes);
    const internalRoute = router['getDefaultRoute']();
    expect(internalRoute).toEqual(false);
  });


});
