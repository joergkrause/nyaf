import { NOutletComponent } from '../noutlet.component';

test('n-outlet', () => {
  customElements.define('n-outlet', NOutletComponent);
  document.body.innerHTML = `
    <n-outlet></n-outlet>
  `;
  const el = document.querySelector('n-outlet') as NOutletComponent;
  const expected = el.innerHTML;
  expect(expected).toEqual(`<!--OUTLET n-router-outlet= id=${el['outletId']} -->`);
});
