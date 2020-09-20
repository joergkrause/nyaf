import { DomOp } from '../dom-operations';

let elementTree: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = `
<div class='container matchParents'>
  <header class='matchParents'></header>
  <section id='s1' class='matchParents'>
    <div id='inner'>
      <button>Test</button>
    </div>
  </section>
  <footer></footer>
</div>
`
  elementTree = document.body;
});

describe('DOM operation function', () => {
  it('getParents', () => {
    const searchElement = elementTree.querySelectorAll('.matchParents');
    const startElement = elementTree.querySelector('button');
    const result = DomOp.getParent(startElement, '.matchParents');
    expect(result).not.toBeNull(); // TODO: incomplete test
  }),
    it('getParent', () => {
      const searchElement = elementTree.querySelector('#s1');
      const startElement = elementTree.querySelector('button');
      const result = DomOp.getParent(startElement, '#s1');
      expect(result).toMatchObject(searchElement);
    }),
    it('getParentsUntil', () => {

    }),
    it('getClosest', () => {
      const searchElement = elementTree.querySelector('section');
      const startElement = elementTree.querySelector('#inner');
      const result = DomOp.getClosest(startElement, 'section');
      expect(result).toMatchObject(searchElement);
    })
})