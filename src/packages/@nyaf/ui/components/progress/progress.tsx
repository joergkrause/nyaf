import JSX, { Events, CustomElement, Properties, BaseComponent } from '@nyaf/lib';
require('./progress.scss');

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
@Events([])
export class Progress extends BaseComponent<ProgressProps> {
    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.initValue || props.buffer !== state.initBuffer) {
            return {
                value: parseInt(props.value),
                initValue: parseInt(props.value),
                buffer: parseInt(props.buffer),
                initBuffer: parseInt(props.buffer)
            };
        }
        return null;
    }

    constructor() {
        super();

        this.state = {
            initValue: parseInt(props.value),
            value: parseInt(props.value),
            buffer: parseInt(props.buffer),
            initBuffer: parseInt(props.buffer)
        };
    }

    async render() {
        const {showValue, variant, cls, clsBack, clsBar, clsBuffer, clsLoad, clsValue} = this.data;
        const {value, buffer} = this.state;
        const valuePosition = value > 90 ? {left: 'auto', right: (100 - value) + 'px'} : {left: value + '%'};

        return (
            <div className={`progress ${cls} ${variant === 'line' ? 'line' : ''}`}>
                {variant !== 'line' && (
                    <>
                        <div className={'back ' + clsBack}/>
                        <div className={'bar ' + clsBar} style={{width: value + '%'}}/>
                        <div className={'buffer ' + clsBuffer} style={{width: buffer + '%'}}/>
                    </>
                )}
                {variant === 'load' && (
                    <div className={'load ' + clsLoad}/>
                )}
                {showValue && (
                    <span className={'value ' + clsValue} style={valuePosition}>{value + '%'}</span>
                )}
            </div>
        );
    }
}

interface ProgressProps {
    variant: 'default', // line, load
    showValue: false;
    value: 0;
    buffer: 0;
    cls: '',
    clsBack: '',
    clsBar: '',
    clsBuffer: '',
    clsLoad: '',
    clsValue: '',
}
