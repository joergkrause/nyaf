import { BaseComponent } from "../base.component";

describe('Basecomponent', () => {

  class TestComponent extends BaseComponent<any> {
    render() {
      return null;
    }
  }



  it('Base Component', () => {
    // const t = new TestComponent();
    // expect(t).not.toBeNull();
  });

});
