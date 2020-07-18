import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
import { ViewModel, IModel, ModelBinder } from '@nyaf/forms';
require('./input-file.scss');

class InputFileModel {
  caption: string;
  value: string;
  focus: boolean;
}

@CustomElement('ui-inputfile')
@Properties<InputFileProps>({
  mode: 'input',

  buttonIcon: '',
  buttonIconPrefix: 'mif-',
  buttonIconSize: '1x',
  buttonTitle: 'Choose file(s)',

  dropIcon: '',
  dropIconPrefix: 'mif-',
  dropIconSize: '1x',
  dropTitle: <span><strong>Choose a file(s)</strong> or drop it here</span>,
  dropTitleSecondary: 'file(s) selected',

  append: '',
  prepend: '',
  clear: true,
  select: true,
  customButtons: [],
  cls: '',
  className: '',
  clsCaption: '',
  clsAppend: '',
  clsPrepend: '',
  clsButtonGroup: '',
  clsCustomButton: '',
  clsClearButton: '',
  clsSelectButton: '',
})
@ViewModel<InputFileModel>(InputFileModel)
@Events([
  'clear',
  'change',
  'blur',
  'focus'
])
export class InputFile extends BaseComponent<InputFileProps> implements IModel<InputFileModel> {

  private input: HTMLInputElement;

  constructor() {
    super();

    this.model.scope.caption = '';
    this.model.scope.value = '';
    this.model.scope.focus = false;
    this.input = null;
  }

  model: ModelBinder<InputFileModel>;

  componentDidMount() {
    this.input.addEventListener('blur', this.onBlur);
    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    this.input.removeEventListener('blur', this.onBlur);
    this.input.removeEventListener('focus', this.onFocus);
    this.input.removeEventListener('change', this.onChange);
  }

  onBlur(e) {
    this.setState({
      focus: false
    });
    this.dispatch('blur', {});
  }

  onFocus(e) {
    this.setState({
      focus: true
    });
    this.dispatch('focus', {});
  }

  onChange(e) {
    const fileNames = [...e.target.files].map(f => f.name);

    this.model.scope.value = e.target.files;
    this.model.scope.caption = fileNames.join(', ');

    this.dispatch('change', {});
  }

  clearValue(e) {

    this.input.value = '';
    this.model.scope.value = '';
    this.model.scope.caption = '';

    this.focus();

    this.dispatch('clear', {});
  }

  inputClick() {
    this.input.click();
  }

  focus() {
    this.input.focus();
  }

  async render() {
    const {
      append, prepend, clear, select, customButtons,
      cls, className, clsAppend, clsPrepend, clsClearButton, clsCustomButton, clsSelectButton, clsButtonGroup, clsCaption,
      mode, buttonTitle, dropTitle, dropTitleSecondary, buttonIcon, buttonIconPrefix, buttonIconSize,
      dropIcon, dropIconPrefix, dropIconSize,
      ...props } = this.data;
    const { value, focus, caption } = this.model.scope;
    const buttons = true;

    return await (
      <label className={(mode !== 'input' ? ' drop-zone ' : ' file ') + (focus ? ' focused ' : '') + cls + ' ' + className} title={caption}>

        <input {...props} type={'file'} onChange={this.onChange} ref={ref => this.input = ref} />

        {mode === 'input' && prepend !== '' && (
          <span className={'prepend ' + clsPrepend}>{prepend}</span>
        )}

        {mode === 'input' && (
          <span className={'caption ' + clsCaption}>{caption}</span>
        )}

        {mode === 'input' && buttons && (
          <div className={'button-group ' + clsButtonGroup}>
            {clear && !props.readOnly && (
              <Button cls={'input-clear-button ' + clsClearButton} type='button' onClick={this.clearValue} tabIndex={-1}>
                <span className='default-icon-cross' />
              </Button>
            )}
            {select && !props.readOnly && (
              <Button cls={'button input-select-button ' + clsSelectButton} type='button' tabIndex={-1} onClick={this.inputClick}>
                {buttonIcon !== '' && (
                  <Icon name={buttonIcon} iconPrefix={buttonIconPrefix} size={buttonIconSize} />
                )}

                {buttonTitle !== '' && (
                  <span>{buttonTitle}</span>
                )}
              </Button>
            )}

            {customButtons.map(function (btn, index) {
              const { cls, ...btnProps } = btn;
              return (
                <Button cls={cls + ' ' + clsCustomButton} key={index} {...btnProps} />
              );
            })}
          </div>
        )}

        {mode === 'input' && append !== '' && (
          <span className={'append ' + clsAppend}>{append}</span>
        )}

        {mode !== 'input' && dropIcon !== '' && (
          <ui-icon name={'dropIcon'} iconPrefix={dropIconPrefix} size={dropIconSize}></ui-icon>
        )}

        {mode !== 'input' && (
          <>
            <span className={'caption ' + clsCaption}>{dropTitle}</span>
            <span className={'files ' + clsCaption}>{value.length + ' ' + dropTitleSecondary}</span>
          </>
        )}

      </label>
    );
  }
}

interface InputFileProps {
  mode: string;

  buttonIcon: string;
  buttonIconPrefix: string;
  buttonIconSize: string;
  buttonTitle: string;

  dropIcon: string;
  dropIconPrefix: string;
  dropIconSize: string;
  dropTitle: string;
  dropTitleSecondary: string;

  append: string;
  prepend: string;
  clear: boolean;
  select: boolean;
  customButtons: [];
  cls: string;
  className: string;
  clsCaption: string;
  clsAppend: string;
  clsPrepend: string;
  clsButtonGroup: string;
  clsCustomButton: string;
  clsClearButton: string;
  clsSelectButton: string;
}
