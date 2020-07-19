import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
import { IModel, ModelBinder, ViewModel, to } from '@nyaf/forms';

require('./checkbox.scss');
require('./switch.scss');

class CheckboxModel {
  checked = false;
  initState = false;
}

@CustomElement('ui-checkbox')
@Properties<CheckboxProps>({
  checked: false,
  mode: 'checkbox',

  caption: '',
  variant: 1,
  transition: true,

  cls: '',
  className: '',
  clsCheck: '',
  clsCaption: ''
})
@ViewModel<CheckboxModel>(CheckboxModel)
@Events([
  'change',
  'check',
  'unCheck'
])
export class Checkbox extends BaseComponent<CheckboxProps> implements IModel<CheckboxModel> {

  constructor() {
    super();
    this.model.scope.checked = this.data.checked;
    this.model.scope.initState  = this.data.checked;
  }

  model: ModelBinder<CheckboxModel>;

  static getDerivedStateFromProps(props, state) {
    if (props.checked !== state.initState) {
      return {
        checked: props.checked,
        initState: props.checked
      };
    }
    return null;
  }

  onChangeHandler(e) {
    const state = e.target.checked;
    this.model.scope.checked = state;
    this.dispatch('change', {});
    if (state) {
      this.dispatch('check', {});
    } else {
      this.dispatch('uncheck', {});
    }
  }

  async render() {
    const {
      transition,
      mode,
      checked: propsChecked,
      caption,
      variant,
      cls, className,
      clsCaption,
      clsCheck,
      ...input
    } = this.data;

    const checkboxMode = mode === 'switch' ? `switch${(variant === 2 ? '-material' : '')}` : `checkbox ${(variant === 2 ? 'style2' : '')}`;

    return await (
      <label className={`${checkboxMode} ${transition ? 'transition-on' : ''} ${cls} ${className}`}>
        <input type='checkbox' {...input} n-bind={to<CheckboxModel, HTMLInputElement>(m => m.checked, 'checked')} n-on-change={this.onChangeHandler} />
        <span className={'check ' + clsCheck} />
        <span className={'caption ' + clsCaption}>{caption}</span>
      </label>
    );
  }
}

@CustomElement('ui-switch')
@Properties<CheckboxProps>(
  {
    checked: false,
    mode: 'switch',

    caption: '',
    variant: 1,
    transition: true,

    cls: '',
    className: '',
    clsCheck: '',
    clsCaption: ''
  }
)
export class Switch extends BaseComponent<CheckboxProps> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <ui-checkbox mode={'switch'} {...this.data} />
    );
  }
}

interface CheckboxProps {
  checked: false;
  mode: 'checkbox' | 'switch';

  caption: string;
  variant: number;
  transition: boolean;

  cls: string;
  className: string;
  clsCheck: string;
  clsCaption: string;
}
