import JSX, { CustomElement, Properties, Events, BaseComponent } from '@nyaf/lib';
require('./rating.scss');
import Utils from '../../routines/utils';
import { IModel, ModelBinder } from '@nyaf/forms';

class RatingModel {
  value: number;
  initValue: number;
}

@CustomElement('ui-rating')
@Properties<RatingProps>({
  value: 0,
  values: [],
  round: 'round', // round, ceil, floor
  stars: 5,
  isStatic: false,
  half: true,
  caption: '',
  starColor: null,
  staredColor: null,
  cls: '',
  clsStars: '',
  clsStar: '',
  clsStarOn: '',
  clsCaption: '',
})
@Events([
  'Change',
  'Click'
])
export class Rating extends BaseComponent<RatingProps> implements IModel<RatingModel> {

  private input: HTMLInputElement;
  private _id: string;
  private values: any;

  constructor() {
    super();

    this.model.scope.value = this.data.value;
    this.model.scope.initValue = this.data.value;

    this._id = this.id ? this.id : Utils.elementId('rating');
    this.values = this.data.values.length ? this.data.values.sort((a, b) => a - b) : [...Array(this.data.stars)].map((el, i) => i + 1);

    if (this.data.starColor || this.data.staredColor) {
      const sheet = Utils.newCssSheet();
      if (this.data.starColor && !this.data.isStatic) {
        Utils.addCssRule(sheet, '#' + this._id + ' .stars:hover li', 'color: ' + this.data.starColor + ';');
      }
      if (this.data.staredColor) {
        Utils.addCssRule(sheet, '#' + this._id + ' .stars li.on', 'color: ' + this.data.staredColor + ';');
        Utils.addCssRule(sheet, '#' + this._id + ' .stars li.half::after', 'color: ' + this.data.staredColor + ';');
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  model: ModelBinder<RatingModel>;

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.initValue) {
      return {
        value: props.value,
        initValue: props.value
      };
    }
    return null;
  }

  onChange(e) {
    this.dispatch('change', {});
    console.log(e);
  }

  onClick(val) {
    this.model.scope.value = this.values.indexOf(val) + 1;
    this.dispatch('click', {});
  }

  async render() {
    const { round, half, isStatic, caption, stars, cls, clsStars, clsStar, clsStarOn, clsCaption } = this.data;
    const { value } = this.model.scope;
    const items = [], values = this.values;
    const val = isStatic ? Math.floor(value) : Math[round](value);

    for (let i = 1; i <= stars; i++) {
      items.push(<li key={i} className={clsStar + ' ' + (i <= val ? ' on ' + clsStarOn + ' ' : '')} onClick={this.onClick.bind(this, values[i - 1])} />);
    }

    if (isStatic && half) {
      const dec = Math.round((value % 1) * 10);
      if (dec > 0 && dec <= 9) {
        items[val] = React.cloneElement(items[val], {
          className: items[val].className + ' half half-' + (dec * 10)
        });
      }
    }

    return (
      <label className={'rating ' + cls + (isStatic ? ' static ' : '')} id={this.id}>
        <input type={'text'} value={value} onChange={this.onChange} ref={this.input} />

        <ul className={'stars ' + clsStars}>
          {items}
        </ul>

        {caption !== '' && (
          <span className={'result ' + clsCaption}>{caption}</span>
        )}
      </label>
    );
  }

}

interface RatingProps {
  value: number;
  values: any[];
  round: 'round' | 'ceil' | 'floor';
  stars: number;
  isStatic: boolean;
  half: boolean;
  caption: string;
  starColor: string;
  staredColor: string;
  cls: string;
  clsStars: string;
  clsStar: string;
  clsStarOn: string;
  clsCaption: string;
}
