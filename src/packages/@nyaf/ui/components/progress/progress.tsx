import JSX, { Events, CustomElement, Properties, BaseComponent } from '@nyaf/lib';
import { ViewModel, IModel, ModelBinder } from '@nyaf/forms';
require('./progress.scss');

class ProgressModel {
  initValue: number;
  value: number;
  buffer: number;
  initBuffer: number;
}

@CustomElement('ui-progress')
@Properties<ProgressProps>({
  variant: 'default', // line, load
  showValue: false,
  value: 0,
  buffer: 0,
  cls: '',
  clsBack: '',
  clsBar: '',
  clsBuffer: '',
  clsLoad: '',
  clsValue: '',
})
@ViewModel<ProgressModel>(ProgressModel)
@Events([])
export class Progress extends BaseComponent<ProgressProps> implements IModel<ProgressModel> {

  constructor() {
    super();

    this.model.scope.initValue = this.data.value;
    this.model.scope.value = this.data.value;
    this.model.scope.buffer = this.data.buffer;
    this.model.scope.initBuffer = this.data.buffer;
  }

  model: ModelBinder<ProgressModel>;

  async render() {
    const { showValue, variant, cls, clsBack, clsBar, clsBuffer, clsLoad, clsValue } = this.data;
    const { value, buffer } = this.model.scope;
    const valuePosition = value > 90 ? { left: 'auto', right: (100 - value) + 'px' } : { left: value + '%' };

    return (
      <div className={`progress ${cls} ${variant === 'line' ? 'line' : ''}`}>
        {variant !== 'line' && (
          <>
            <div className={'back ' + clsBack} />
            <div className={'bar ' + clsBar} style={{ width: value + '%' }} />
            <div className={'buffer ' + clsBuffer} style={{ width: buffer + '%' }} />
          </>
        )}
        {variant === 'load' && (
          <div className={'load ' + clsLoad} />
        )}
        {showValue && (
          <span className={'value ' + clsValue} style={valuePosition}>{value + '%'}</span>
        )}
      </div>
    );
  }
}

interface ProgressProps {
  variant: 'default' | 'line' | 'load';
  showValue: boolean;
  value: number;
  buffer: number;
  cls: string;
  clsBack: string;
  clsBar: string;
  clsBuffer: string;
  clsLoad: string;
  clsValue: string;
}
