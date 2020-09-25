import { NOutletComponent } from '../noutlet.component';

test('n-outlet', () => {
  customElements.define('n-outlet', NOutletComponent);
  document.body.innerHTML = `
    <n-outlet></n-outlet>
  `;
  const expected = document.querySelector('n-outlet').innerHTML;
  expect(expected).toEqual('');
});
