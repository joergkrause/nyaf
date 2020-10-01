import { UpdatesBinder } from '../updatesbinder.class';
import { BaseComponent } from '@nyaf/lib';

describe('Updates Binder', () => {

  class TestComponent extends BaseComponent<any> {
    constructor() {
      super();
    }
    render() {
      return '';
    }
  }

  it('no instance without init', () => {
    const el = document.createElement('div');
    const e = UpdatesBinder.getInstance(el);
    // no initialized
    expect(e).toBeUndefined();
  });

  it('instance with init', () => {
    customElements.define('updates-test', TestComponent);
    const el = document.createElement('updates-test');
    document.body.innerHTML = '<updates-test></updates-test>';
    const c = document.querySelector<HTMLElement>('updates-test') as BaseComponent;
    UpdatesBinder.initialize(c);
    const e = UpdatesBinder.getInstance(c);
    // no initialized
    expect(e).not.toBeUndefined();
  });

});
