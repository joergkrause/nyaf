import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
import { ViewModel, IModel, ModelBinder } from '@nyaf/forms';
require('./input.scss');

const AutocompleteListItem = ({ start, coincidence, end }) => {
  return (
    <span>{start}<strong>{coincidence}</strong>{end}</span>
  );
};

class InputModel {
  initValue: string;
  value: string;
  inputType: string;
  focus: boolean;
  fieldState: string;
}

@CustomElement('ui-infobutton')
@Properties<InputProps>({
  fieldState: 'normal',
  errorMessage: '',
  value: '',
  type: 'text',
  append: '',
  prepend: '',
  clear: true,
  reveal: true,
  search: false,
  searchType: 'custom',
  history: false,
  preventSubmit: true,
  autocomplete: [],
  autocompleteHeight: 200,
  customButtons: [],
  cls: '',
  className: '',
  clsAppend: '',
  clsPrepend: '',
  clsButtonGroup: '',
  clsCustomButton: '',
  clsClearButton: '',
  clsSearchButton: '',
  clsRevealButton: '',
  clsAutocomplete: '',
  clsAutocompleteItem: '',
  clsErrorMessage: ''
})
@ViewModel<InputModel>(InputModel)
@Events([
  'search',
  'clear',
  'reveal',
  'change',
  'keyup',
  'blur',
  'focus'
])
export class Input extends BaseComponent<InputProps> implements IModel<InputModel> {

  private input = null;
  private history = [];
  private historyIndex = -1;
  private autocomplete = [];


  constructor() {
    super();

    this.model.scope.initValue = this.data.value;
    this.model.scope.value = this.data.value;
    this.model.scope.inputType = this.data.type;
    this.model.scope.focus = false;
    this.model.scope.fieldState = this.data.fieldState;

    this.input = null;
    this.history = [];
    this.historyIndex = -1;
    this.autocomplete = [...this.data.autocomplete].sort((a, b) => a > b);

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.changeInputType = this.changeInputType.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.autocompleteItemClick = this.autocompleteItemClick.bind(this);
    this.focus = this.focus.bind(this);
  }

  model: ModelBinder<InputModel>;

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.initValue || props.fieldState !== state.fieldState) {
      return {
        value: props.value,
        initValue: props.value,
        fieldState: props.fieldState
      };
    }
    return null;
  }

  componentDidMount() {
    this.input.addEventListener('blur', this.onBlur);
    this.input.addEventListener('focus', this.onFocus);
  }

  componentWillUnmount() {
    this.input.removeEventListener('blur', this.onBlur);
    this.input.removeEventListener('focus', this.onFocus);
  }

  onBlur(e) {
    this.model.scope.focus = false;
    this.dispatch('blur', {});
  }

  onFocus(e) {
    this.model.scope.focus = true;
    this.dispatch('focus', {});
  }

  onChange(e) {
    this.model.scope.value = e.target.value ? e.target.value : '';
    this.dispatch('change', {});
  }

  onKeyUp(e) {
    const val = this.input.value;

    if (this.data.history) {
      if (e.keyCode === 13) { // Enter
        this.history.push(val);
        this.historyIndex = this.history.length - 1;
        this.clearValue(e);
        if (this.data.preventSubmit) {
          e.preventDefault();
        }
      }

      if (e.keyCode === 38) { // Up
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.model.scope.value = this.history[this.historyIndex];
        }
      }

      if (e.keyCode === 40) { // Down
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.model.scope.value = this.history[this.historyIndex];
        }
      }
    }

    this.dispatch('change', {});
    this.dispatch('keyup', {});
  }

  changeInputType() {

    // this.setState((prev) => ({
    //   inputType: prev.inputType === 'text' ? 'password' : 'text'
    // }));

    // onReveal(this.input);
  }

  clearValue(e) {

    this.model.scope.value = '';

    // Original event is a click. On target == clear button. Without value. It cause errors in onChange
    this.input.value = '';
    const event = new Event('change', { bubbles: true, composed: true });
    this.input.dispatchEvent(event);

    this.dispatch('focus', {});
    this.dispatch('change', {});
    this.dispatch('clear', {});
  }

  searchValue() {
    const { searchType } = this.data;

    if (searchType === 'custom') {
      this.dispatch('search', {
        detail: {
          value: this.input.value,
          input: this.input
        }
      });
    } else {
      if (this.input.form) {
        this.input.form.submit();
      }
    }
  }

  autocompleteItemClick(e) {
    this.model.scope.value = e.target.getAttribute('data-item');
  }

  focus() {
    this.input.focus();
  }

  async render() {
    const {
      errorMessage, fieldState: initFieldState, type, append, prepend, clear, reveal, search, searchType, history, preventSubmit, customButtons,
      autocomplete, autocompleteHeight,
      cls, className, clsAppend, clsPrepend,
      clsClearButton, clsCustomButton, clsSearchButton, clsRevealButton, clsAutocomplete, clsAutocompleteItem, clsButtonGroup, clsErrorMessage,
      ...props } = this.data;
    const { value, inputType, focus, fieldState } = this.model.scope;
    const buttons = clear || reveal || search;

    const autocompleteItemClick = this.autocompleteItemClick;

    return await (
      <>
        <div className={'input ' + (focus ? 'focused' : '') + (fieldState === 'error' ? ' invalid ' : fieldState === 'success' ? ' success ' : '') + ' ' + cls}>

          <input className={className} {...props} type={inputType} value={value} onChange={this.onChange} ref={ref => this.input = ref} onKeyUp={this.onKeyUp} />

          {buttons && (
            <div className={'button-group ' + clsButtonGroup}>
              {clear && !props.readOnly && (
                <ui-button cls={'input-clear-button ' + clsClearButton} type='button' onClick={this.clearValue} tabIndex={-1}>
                  <span className='default-icon-cross' />
                </ui-button>
              )}
              {type === 'password' && reveal && (
                <ui-button cls={'input-reveal-button ' + clsRevealButton} type='button' onClick={this.changeInputType} tabIndex={-1}>
                  <span className='default-icon-eye' />
                </ui-button>
              )}
              {search && !props.readOnly && (
                <ui-button cls={'input-search-button ' + clsSearchButton} type='button' onClick={this.searchValue} tabIndex={-1}>
                  <span className='default-icon-search' />
                </ui-button>
              )}

              {customButtons.map(function (btn, index) {
                const { cls, ...btnProps } = btn;
                return (
                  <ui-button cls={cls + ' ' + clsCustomButton} key={index} {...btnProps} />
                );
              })}
            </div>
          )}

          {prepend && (
            <span className={'prepend ' + clsPrepend}>{prepend}</span>
          )}

          {append && (
            <span className={'append ' + clsAppend}>{append}</span>
          )}

          {autocomplete.length > 0 && (
            <div className={'autocomplete-list ' + clsAutocomplete}>
              {
                this.autocomplete.map(function (item, index) {
                  const searchIndex = item.toLowerCase().indexOf(value.toLowerCase());

                  return (
                    <div data-item={item}
                      className={'item ' + clsAutocompleteItem}
                      key={index}
                      hidden={item === value || value === '' || searchIndex === -1}
                      onClick={autocompleteItemClick}>
                      <ui-autocompleteListItem
                        start={item.substr(0, searchIndex)}
                        coincidence={item.substr(searchIndex, value.length)}
                        end={item.substr(searchIndex + value.length)} />
                    </div>
                  );
                })
              }
            </div>
          )}
        </div>
        {fieldState === 'error' && errorMessage !== '' && (
          <span className={'invalid_feedback ' + clsErrorMessage}>{errorMessage}</span>
        )}
      </>
    );
  }
}

interface InputProps {
  fieldState: string;
  errorMessage: string;
  value: string;
  type: 'text' | 'password' | 'number' | 'date';
  append: string;
  prepend: string;
  clear: true;
  reveal: true;
  search: false;
  searchType: string;
  history: false;
  preventSubmit: boolean;
  autocomplete: Array<string>;
  autocompleteHeight: number;
  customButtons: [];
  cls: string;
  className: string;
  clsAppend: string;
  clsPrepend: string;
  clsButtonGroup: string;
  clsCustomButton: string;
  clsClearButton: string;
  clsSearchButton: string;
  clsRevealButton: string;
  clsAutocomplete: string;
  clsAutocompleteItem: string;
  clsErrorMessage: string;
}
