import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
require('./dropdown.scss');

@CustomElement('ui-dropdown')
@Properties<DropdownProps>({
  as: 'div',
  speed: 100,
  position: 'absolute',
  cls: '',
  clsDropdown: ''
})
export class Dropdown extends BaseComponent<DropdownProps> {

  private dropdown: HTMLElement;

  constructor() {
    super();

    this.state = {
      open: false
    };


    this.toggleState = this.toggleState.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.dropdown.current && !this.dropdown.current.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  }

  toggleState(e) {
    const openState = this.state.open;
    this.setState({
      open: !openState
    });
    e.preventDefault();
  }

  async render() {
    const { as: Element, speed, cls, clsDropdown, position } = this.data;
    const { open } = this.state;
    const children = Array.from(this.children);
    const transition = `height ${speed}ms cubic-bezier(.4, 0, .2, 1)`;

    return (
      <Element className={'dropdown ' + cls + ' ' + (open ? 'dropped' : '')} ref={this.dropdown}>
        {React.cloneElement(children[0], {
          onClick: this.toggleState
        })}

        <ui-collapse isOpen={open} className={'drop-object ' + clsDropdown} transition={transition}>
          {children[1]}
        </ui-collapse>
      </Element>
    );
  }
}

interface DropdownProps {
  as: string;
  speed: number;
  position: 'absolute' | 'relative' | 'fixed';
  cls: string;
  clsDropdown: string;
}
