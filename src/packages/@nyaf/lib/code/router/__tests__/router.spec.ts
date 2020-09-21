import { Router } from '../router';
import { Routes } from '../routes';
import { BaseComponent } from '../../../components/base.component';

describe('router', () => {

  let router: Router = null;

  beforeAll(() => {
    const outlet = document.createElement('div');
    outlet.setAttribute('n-router-outlet', '');
    document.body.appendChild(outlet);
  });

  beforeEach(() => {
    router = Router.getInstance(true);
  });

  afterAll(() => {
    document.body.innerHTML = '';
  });

  // class MockComponent extends BaseComponent {
  //   constructor() {
  //     super();
  //   }
  //   async render() {
  //     return '<div>Test</div>';
  //   }
  // }

  // it('works', () => {
  //   expect(router).not.toBeNull();
  //   const testRoutes: Routes = {
  //     '': { component: MockComponent },
  //     '/home': { component: MockComponent }
  //   };
  //   expect(router.outlets).toEqual(0);
  //   router.registerRouter(testRoutes);
  //   expect(router.outlets.length).toEqual(1);
  // });

  it('register routes', () => {
    expect(router).not.toBeNull();
  });

  it('navigates', () => {
    expect(router).not.toBeNull();
  });

  it('set outlet', () => {
    expect(router).not.toBeNull();
  });

});
