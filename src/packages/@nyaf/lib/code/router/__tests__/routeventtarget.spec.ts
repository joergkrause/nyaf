import { RouteEventTarget } from '../routeeventtarget';
import { BaseComponent } from '@nyaf/lib';

describe('routeeventtarget class', () => {

  class TestRouterComponent extends BaseComponent<any>{
    render() {
      return null;
    }
  }

  it('register routes', () => {
    const routes = [{
      path: /test/,
      action: { component: TestRouterComponent },
      legacy: ''
    }];
    const rvt = new RouteEventTarget(routes);
    expect(rvt).not.toBeNull();
    expect(rvt.routes).toEqual(routes);
  });


});
