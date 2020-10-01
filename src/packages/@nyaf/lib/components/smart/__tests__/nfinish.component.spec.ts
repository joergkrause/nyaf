import { GlobalProvider } from '../../../code/globalprovider';
import { BaseComponent } from '../../base.component';
import { CustomElement } from '../../../decorators/customelement.decorator';

describe('n-finish', () => {

  @CustomElement('nfinish-test-parent')
  class ParentComponent extends BaseComponent<any> {
    constructor() {
      super();
    }
    render() {
      return '<ul><n-finish></n-finish></ul>';
    }
  }

  beforeAll(() => {
    GlobalProvider.bootstrap({
      components: [ParentComponent]
    });
  });

  it('exists in global setting', () => {
    document.body.innerHTML = '<ul><li></li><n-finish></n-finish></ul>';
    const expectedNFinish = document.querySelector('n-finish');
    expect(expectedNFinish).not.toBeUndefined();
    const expected = document.querySelector('ul').innerHTML.trim();
    expect(expected).toEqual('<li></li>');
  });

  it('handles dynamic elements', () => {
    document.body.innerHTML = `
        <nfinish-test-parent>
          <ul><n-finish></n-finish></ul>
        </nfinish-test-parent>`;
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.innerHTML = 'Dynamic Element';
    ul.insertAdjacentElement('afterbegin', li);
    const expected = document.querySelector('ul').innerHTML.trim();
    expect(expected).toEqual('<li>Dynamic Element</li>');
  });

});
