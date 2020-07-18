import JSX, { BaseComponent, CustomElement, Properties, LifeCycle, ShadowDOM, isNumber } from '@nyaf/lib';
require('./hint.scss');

@CustomElement('ui-hint')
@Properties<HintProps>({
  text: '',
  position: 'top', // top, left, right, bottom
  distance: 4,
  markText: true,
  width: 'default',
  timeout: 10000,
  cls: '',
  className: ''
})
@ShadowDOM()
export class Hint extends BaseComponent<HintProps> {

  private hint: any;

  constructor() {
    super();
    this.children = typeof props.children === 'object' ? React.Children.toArray(props.children)[0] : React.createElement('span', { className: props.markText ? 'hinted-text' : '' }, props.children);
    this.hint = null;

    this.destroyHint = this.destroyHint.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.createHint = this.createHint.bind(this);
  }

  lifeCycle(state: LifeCycle) {
    switch (state) {
      case LifeCycle.Load:
        this.componentDidMount();
        break;
      case LifeCycle.Disconnect:
        this.componentWillUnmount();
        break;
    }
  }

  componentDidMount() {
    const el = this.shadowRoot;
    el.addEventListener('mouseenter', this.mouseEnter);
    el.addEventListener('mouseleave', this.mouseLeave);
    window.addEventListener('scroll', this.setPosition);
    window.addEventListener('resize', this.setPosition);
  }

  componentWillUnmount() {
    const el = this.shadowRoot;
    el.removeEventListener('mouseenter', this.mouseEnter);
    el.removeEventListener('mouseleave', this.mouseLeave);
    window.removeEventListener('scroll', this.setPosition);
    window.removeEventListener('resize', this.setPosition);
  }

  mouseEnter() {
    this.createHint();
  }

  mouseLeave() {
    this.destroyHint();
  }

  setPosition() {

    if (!this.hint) {
      return;
    }

    const target = this.shadowRoot;
    const hint = this.hint;
    const { position, distance } = this.data;
    const targetRect = target.host.getBoundingClientRect();
    const hintRect = hint.getBoundingClientRect();
    let top, left;

    switch (position) {
      case 'bottom': {
        top = (targetRect.top + targetRect.height + distance) + 'px';
        left = (targetRect.left - (hintRect.width - targetRect.width) / 2) + 'px';
        break;
      }
      case 'left': {
        top = (targetRect.top + targetRect.height / 2 - hintRect.height / 2) + 'px';
        left = (targetRect.left - hintRect.width - distance) + 'px';
        break;
      }
      case 'right': {
        top = (targetRect.top + targetRect.height / 2 - hintRect.height / 2) + 'px';
        left = (targetRect.left + targetRect.width + distance) + 'px';
        break;
      }
      default: {
        top = (targetRect.top - hintRect.height - distance) + 'px';
        left = (targetRect.left - (hintRect.width - targetRect.width) / 2) + 'px';
      }
    }

    hint.style.top = top;
    hint.style.left = left;
  }

  createHint() {
    const { text, width, timeout, cls, className } = this.data;
    const hint = document.createElement('div');

    document.body.appendChild(hint);

    hint.style.visibility = 'hidden';
    hint.className = `hint ${cls} ${className}`;
    hint.innerText = text;

    if (width !== 'default') {
      hint.style.width = !isNumber(width) ? width : width + 'px';
    }

    hint.style.visibility = 'visible';

    this.hint = hint;

    this.setPosition();

    setTimeout(() => {
      this.destroyHint();
    }, timeout);
  }

  destroyHint() {
    if (!this.hint) {
      return;
    }
    document.body.removeChild(this.hint);
    this.hint = null;
  }

  async render() {
    return await (
      <>
        { this.children }
      </>
    );
  }
}

interface HintProps {
  text?: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  distance?: number;
  markText?: boolean;
  width?: 'default' | string;
  timeout?: number;
  cls?: string;
  className?: string;
}
