import JSX, { CustomElement, BaseComponent, Directive, BaseDirective } from '@nyaf/lib';

/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-directive')
export class DirectiveComponent extends BaseComponent<any> {

  async render() {
    return await (
      <button type='button' class='btn btn-outline-success' directive='enter'>
        {this.data.text}
      </button>
    );
  }

  public setZero() {
    this.data.text = '0 (zero)';
  }

}


@Directive('[directive="enter"]')
export class EnterDirective extends BaseDirective {

  constructor(public host: HTMLElement) {
    super(host);
  }

  setup() {
    this.host.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        this.host.innerHTML = 'pressed, thank\'s for nothing';
      }
      if (e.keyCode === 27) {
        this.host.innerHTML = 'escaped, what a relief';
      }
    });
    this.host.addEventListener('click', (e: MouseEvent) => {
      alert('ouch');
    });
  }

}
