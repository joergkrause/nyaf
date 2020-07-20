import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
import { IModel, ModelBinder } from '@nyaf/forms';
require('./select.scss');
require('../d-menu/d-menu.scss');

class SelectModel {
  focus = false;
  open = false;
  filter = '';
  value: any[] = [];
  initValue = '';
  fieldState = null;
}

@CustomElement('ui-')
@Properties<SelectProps>({
  source: null,
  placeholder: 'Select a value...',
  searchPlaceholder: 'Search...',
  fieldState: 'normal',
  filter: true,
  errorMessage: '',
  cls: '',
  className: '',
  clsSelected: '',
  clsTag: '',
  clsPlaceholder: '',
  clsErrorMessage: '',
  speed: 100,
  dropHeight: 200,
  prepend: null,
  append: null,
  clsPrepend: '',
  clsAppend: '',
  clsDropdownToggle: ''
})
@Events([
  'filter',
  'change',
  'focus',
  'blur',
  'drawitem',
  'drawcaption'
])
export class Select extends BaseComponent<SelectProps> implements IModel<SelectModel> {

  constructor() {
    super();

    this.model.scope.focus = false;
    this.model.scope.open = false;
    this.model.scope.filter = '';
    this.model.scope.value = this.data.value;
    this.model.scope.initValue = this.data.value;
    this.model.scope.fieldState = this.data.fieldState;

  }

  private select: HTMLElement;
  private selectInput: HTMLElement;
  private input: HTMLElement;
  private component: HTMLElement;
  private current: HTMLElement;

  model: ModelBinder<SelectModel>;

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

  selectChange() {
    const event = new Event('change', { bubbles: true, composed: true });
    this.current.dispatchEvent(event);
  }

  tagClick(e) {
    if (!e.target.classList.contains('remover')) {
      return false;
    }

    const key = e.target.parentNode.getAttribute('data-value');
    const { value } = this.model.scope;
    const index = value.indexOf(key);

    if (index !== -1) {
      value.splice(index, 1);
    }

    this.model.scope.value = value;

    e.preventDefault();
    e.stopPropagation();
  }

  selectClick() {
    const isOpen = this.model.scope.open;

    this.model.scope.open = !isOpen;

    if (!isOpen) {
      setTimeout(() => {
        if (this.current) { this.current.focus(); }
      }, 100);
    }
  }

  inputChange(e) {
    this.model.scope.filter = e.target.value;
  }

  close() {
    this.model.scope.open = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.model.scope.value) {
      this.selectChange();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.current.addEventListener('keydown', this.handleComponentKeydown);

    const select = this.current;
    if (select) {
      select.addEventListener('focus', this.handleSelectFocusing);
      select.addEventListener('blur', this.handleSelectFocusing);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    this.current.removeEventListener('keydown', this.handleComponentKeydown);

    const select = this.current;
    if (select) {
      select.removeEventListener('focus', this.handleSelectFocusing);
      select.removeEventListener('blur', this.handleSelectFocusing);
    }
  }

  onFilter(e: Event) {
    return this.dispatch('filter', {});
  }

  onChange(e: Event) {
    return this.dispatch('change', {});
  }

  handleComponentKeydown(e) {
    // for correct keyboard behavior for search input
    if ((e.target.tagName || '').toLowerCase() === 'input') {
      return true;
    }

    if (e.keyCode === 32) {
      this.selectClick();
    }

    // TODO add change selected items by arrow key up
    if (this.model.scope.open && e.keyCode === 38) {
      // Up
    }

    // TODO add change selected items by arrow key down
    if (this.model.scope.open && e.keyCode === 40) {
      // Down
    }

    e.preventDefault();
  }

  handleSelectFocusing(e: Event) {
    this.model.scope.focus = e.type === 'focus';
    if (e.type === 'focus') {
      this.dispatch('focus', e);
    } else { }
    this.dispatch('focus', e);
  }

  handleClickOutside(e) {
    if (this.current && !this.current.contains(e.target)) {
      this.model.scope.open = false;
    }
  }

  createListItemGroupTitle(cap) {
    return <li className={'group-title'}>{cap}</li>;
  }

  handleListClick(e) {
    let node = e.target;

    while (node.tagName !== 'LI') {
      node = node.parentNode;
    }

    const val = node.getAttribute('data-value');

    if (val === undefined) { return; }

    const { multiple } = this.data;
    const { value } = this.model.scope;

    if (multiple) {
      if (value.indexOf(val) === -1) { value.push(val); }
      this.model.scope.filter = '';
      this.model.scope.value = value;
    } else {
      this.model.scope.open = false;
      this.model.scope.filter = '';
      this.model.scope.value = val;
    }

  }

  createListItem(val, cap) {
    let hidden;
    const { multiple } = this.data;
    const { filter, value } = this.model.scope;

    hidden = multiple ? value.indexOf(val) !== -1 : filter !== '' && !this.onFilter(filter, cap);

    return (
      <li hidden={hidden}
        className={!multiple && value === val ? 'active' : ''}
        data-value={val}
      >
        <a>{onDrawItem(cap)}</a>
      </li>
    );
  }

  async render() {
    const { source, placeholder, multiple, cls, className, dropHeight, speed, errorMessage, clsSelected,
      clsTag, clsPlaceholder, clsErrorMessage, searchPlaceholder, prepend, append, clsPrepend, clsAppend, clsDropdownToggle } = this.data;
    const { open, filter, value, fieldState, focus } = this.model.scope;
    const transition = `height ${speed}ms cubic-bezier(.4, 0, .2, 1)`;
    const options = {};
    const items = [];
    const tagClick = this.tagClick;

    let optionIndex = -1;

    if (!source) {
      Children.toArray(this.children).forEach(el => {
        if (el.type === 'option') {
          items.push(React.cloneElement(this.createListItem(el.props.value, el.props.children), {
            key: optionIndex++
          }));
          options[el.props.value] = el.props.children;
        } else if (el.type === 'optgroup') {
          items.push(React.cloneElement(this.createListItemGroupTitle(el.props.label), {
            key: optionIndex++
          }));
          Children.toArray(el.props.children).forEach(el => {
            items.push(React.cloneElement(this.createListItem(el.props.value, el.props.children), {
              key: optionIndex++
            }));
            options[el.props.value] = el.props.children;
          });
        }
      });
    } else {
      // tslint:disable-next-line: forin
      for (const key in source) {
        items.push(React.cloneElement(this.createListItem(source[key], key), {
          key: optionIndex++
        }));
        options[source[key]] = key;
      }
    }

    return await (
      <>
        <label tabIndex={1}
          className={`select ${cls} ${className} ${focus ? 'focused' : ''} + ${multiple ? 'multiple' : ''} ${fieldState === 'error' ? 'invalid' : fieldState === 'success' ? 'success' : ''}`}
          ref={this.component}>

          <span className={'dropdown-toggle ' + (` ${clsDropdownToggle} `) + (open ? 'active-toggle' : '')} n-on-click={this.selectClick} />

          <select value={value} multiple={multiple}
            ref={this.select}
            n-on-change={this.onChange}
            name={this.data.name}
          >
            {source && Object.keys(source).map((key, ind) => {
              return (
                <option key={ind} value={source[key]}>{key}</option>
              );
            })}

            {this.children}
          </select>

          <div className={'select-input ' + clsSelected} ref={this.selectInput} onClick={this.selectClick}>
            {multiple && value.map(function (el, index) {
              return (
                <ui-tag cls={clsTag} key={index} onClick={tagClick} data-value={el}>{options[el]}</ui-tag>
              );
            })}

            {!multiple && value !== undefined && !!options[value] && (
              <span className={'caption ' + clsTag}>{onDrawCaption(options[value])}</span>
            )}

            {(!value && !options[value] || value === undefined || (multiple && value.length === 0)) && (
              <span className={`placeholder ${clsPlaceholder}`}>{placeholder}</span>
            )}
          </div>

          <ui-collapse isOpen={open} className={'drop-container'} transition={transition}>
            {this.data.filter && <ui-input onChange={this.inputChange} ref={this.input} placeholder={searchPlaceholder} value={filter} />}
            <ul className={'d-menu'} style={{ maxHeight: dropHeight }} onClick={this.handleListClick}>
              {items}
            </ul>
          </ui-collapse>

          {prepend && (
            <span className={'prepend ' + clsPrepend}>{prepend}</span>
          )}

          {append && (
            <span className={'append ' + clsAppend}>{append}</span>
          )}
        </label>
        {fieldState === 'error' && errorMessage !== '' && (
          <span className={'invalid_feedback ' + clsErrorMessage}>{errorMessage}</span>
        )}
      </>
    );
  }
}

interface SelectProps {
  source: null;
  placeholder: string;
  searchPlaceholder: string;
  fieldState: 'normal';
  filter: boolean;
  errorMessage: string;
  cls: string;
  className: string;
  clsSelected: string;
  clsTag: string;
  clsPlaceholder: string;
  clsErrorMessage: string;
  speed: number;
  dropHeight: number;
  prepend: null;
  append: null;
  clsPrepend: string;
  clsAppend: string;
  clsDropdownToggle: string;
  value?: string[];
  name?: string;
  multiple?: boolean;
  // onFilter: (filter, cap) => (;~(''+ cap).toLowerCase().indexOf(filter.toLowerCase());),
}
