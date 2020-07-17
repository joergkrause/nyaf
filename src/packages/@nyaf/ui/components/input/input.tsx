import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./input.scss');

const AutocompleteListItem = ({ start, coincidence, end }) => {
  return (
    <span>{start}<strong>{coincidence}</strong>{end}</span>
  );
};

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
@Events([
  'Search',
  'Clear',
  'Reveal',
  'Change',
  'KeyUp',
  'Blur',
  'Focu'
])
export class Input extends BaseComponent<InputProps> {
  constructor() {
    super();

    this.state = {
      initValue: props.value,
      value: props.value,
      inputType: props.type,
      focus: false,
      fieldState: props.fieldState
    };

    this.input = null;
    this.history = [];
    this.historyIndex = -1;
    this.autocomplete = [...this.props.autocomplete].sort((a, b) => a > b);

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

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.initValue || props.fieldState !== state.fieldState) {
      return {
        value: props.value,
        initValue: props.value,
        fieldState: props.fieldState
      }
    }
    return null;
  }

  componentDidMount() {
    this.input.addEventListener("blur", this.onBlur);
    this.input.addEventListener("focus", this.onFocus);
  }

  componentWillUnmount() {
    this.input.removeEventListener("blur", this.onBlur);
    this.input.removeEventListener("focus", this.onFocus);
  }

  onBlur(e) {
    this.setState({
      focus: false
    });
    this.props.onBlur(e);
  }

  onFocus(e) {
    this.setState({
      focus: true
    });
    this.props.onFocus(e);
  }

  onChange(e) {
    const { onChange } = this.props;

    this.setState({
      value: e.target.value ? e.target.value : ""
    });

    onChange(e);
  }

  onKeyUp(e) {
    let val = this.input.value;

    if (this.props.history) {
      if (e.keyCode === 13) { //Enter
        this.history.push(val);
        this.historyIndex = this.history.length - 1;
        this.clearValue(e);
        if (this.props.preventSubmit) {
          e.preventDefault();
        }
      }

      if (e.keyCode === 38) { //Up
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.setState({
            value: this.history[this.historyIndex]
          });
        }
      }

      if (e.keyCode === 40) { //Down
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.setState({
            value: this.history[this.historyIndex]
          });
        }
      }
    }

    this.props.onChange(e);
    this.props.onKeyUp(e);
  }

  changeInputType() {
    const { onReveal } = this.props;

    this.setState((prev) => ({
      inputType: prev.inputType === 'text' ? 'password' : 'text'
    }));

    onReveal(this.input);
  }

  clearValue(e) {
    const { onClear } = this.props;

    this.setState({
      value: ""
    });

    // Original event is a click. On target == clear button. Without value. It cause errors in onChange
    this.input.value = '';
    const event = new Event('change', { bubbles: true, composed: true });
    this.input.dispatchEvent(event);

    this.focus(event);
    this.onChange(event);


    onClear(e);
  }

  searchValue() {
    const { searchType, onSearch } = this.props;

    if (searchType === 'custom') {
      onSearch(this.input.value, this.input);
    } else {
      if (this.input.form)
        this.input.form.submit();
    }
  }

  autocompleteItemClick(e) {
    const value = e.target.getAttribute('data-item');
    this.setState({
      value: value
    });
  }

  focus() {
    this.input.focus();
  }

  async render() {
    const {
      errorMessage, fieldState: initFieldState, type, append, prepend, clear, reveal, search, searchType, history, preventSubmit, customButtons, autocomplete, autocompleteHeight, onSearch, onClear, onReveal,
      cls, className, clsAppend, clsPrepend, clsClearButton, clsCustomButton, clsSearchButton, clsRevealButton, clsAutocomplete, clsAutocompleteItem, clsButtonGroup, clsErrorMessage,
      ...props } = this.data;
    const { value, inputType, focus, fieldState } = this.state;
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
                )
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
                  )
                })
              }
            </div>
          )}
        </div>
        {fieldState === 'error' && errorMessage !== '' && (
          <span className={'invalid_feedback ' + clsErrorMessage}>{errorMessage}</span>
        )}
      </>
    )
  }
}

interface InputProps {
  fieldState: string;
  errorMessage: string;
  value: string;
  type: 'text',
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
