import JSX, { BaseComponent, CustomElement, Events } from '@nyaf/lib';

@CustomElement('ui-outside')
@Events(['clickoutside'])
export class ClickOutside extends BaseComponent<{}> {

  private isTouch: boolean;
  private container: HTMLElement;

  constructor() {
    super();
    this.getContainer = this.getContainer.bind(this);
    this.handle = this.handle.bind(this);
    this.isTouch = false;
  }

  getContainer(ref) {
    this.container = ref;
  }

  render() {
    const { ...props } = this.data;
    return <div {...props} ref={this.getContainer}>{this.children}</div>;
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  handle(e) {
    if (e.type === 'touchend') { this.isTouch = true; }
    if (e.type === 'click' && this.isTouch) { return; }
    const el = this.container;
    if (el && !el.contains(e.target)) {
      this.dispatch('clickoutside', e);
    }
  }
}
