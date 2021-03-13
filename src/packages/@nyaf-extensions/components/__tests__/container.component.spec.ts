import { ContainerComponent } from '../container.component';

describe('container component ', () => {

  beforeAll(() => {
    customElements.define('n-container', ContainerComponent);
  })

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('exists', () => {
    const cc = new ContainerComponent();
    document.body.appendChild(cc);
    expect(document.body.innerHTML).toEqual('');
  });

  it('renders', () => {
    const cc = new ContainerComponent();
    cc.classList.add('container');
    cc.classList.add('row');
    cc.classList.add('cell');
    document.body.appendChild(cc);
    expect(document.body.innerHTML).toEqual('');
  });

})