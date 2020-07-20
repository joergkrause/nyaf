import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./button-group.scss');

// TODO Remove active prop from Button

@CustomElement('ui-buttongroup')
@Properties<ButtonGroupProps>({
  active: 1,
  radio: false,
  cls: '',
  className: '',
  clsActive: 'active',
  clsButton: ''
})
@Events(['ButtonClick'])
export class ButtonGroup extends BaseComponent<ButtonGroupProps> {

  constructor() {
    super();

    const pressedButtons = [];

    if (!Array.isArray(props.active)) {
      pressedButtons.push(props.active);
    } else {
      props.active.forEach((ind) => {
        pressedButtons.push(ind);
      });
    }

    this.state = {
      radio: this.props.radio,
      buttons: pressedButtons
    };

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(index) {
    const { buttons, radio } = this.state;
    const active = buttons.includes(index);
    const button = React.Children.toArray(this.props.children)[index - 1];

    if (!radio) {
      if (!active) {
        buttons.push(index);
      } else {
        buttons.splice(buttons.indexOf(index), 1);
      }

      this.setState({
        buttons: buttons
      });
    } else {
      this.setState({
        buttons: [index]
      });
    }
    this.props.onButtonClick(button);
  }

  async render() {
    const { cls, className, clsActive, clsButton } = this.data;
    const { buttons } = this.state;

    return (
      <div className={`button-group ${cls} ${className}`}>
        {
          Array.from(this.children).map((button, index) => {
            const correctIndex = index + 1;
            const isActive = buttons.includes(correctIndex);
            return (
              React.cloneElement(button, {
                cls: button.props.cls + ' ' + clsButton + ' ' + (isActive ? clsActive === '' ? ' active ' : clsActive : ''),
                index: correctIndex,
                onClick: this.buttonClick.bind(this, correctIndex)
              })
            );
          })
        }
      </div>
    );
  }
}

interface ButtonGroupProps {
  active: number;
  radio: boolean;
  cls: string;
  className: string;
  clsActive: string;
  clsButton: string;
}
