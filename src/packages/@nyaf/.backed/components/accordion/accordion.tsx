import JSX, { BaseComponent, CustomElement, Properties, Events } from '@nyaf/lib';
require('./accordion.scss');

@CustomElement('ui-multiaction')
@Properties<AccordionFrameProps>({
  frame: null,
  open: false,
  speed: 300,
  title: '',
  clsFrame: '',
  clsFrameHeading: '',
  clsFrameContent: ''
})
export class AccordionFrame extends BaseComponent<AccordionFrameProps> {
  constructor() {
    super();
    this.onHeadingClick = this.onHeadingClick.bind(this);
  }

  onHeadingClick() {
    this.props.onHeadingClick(this.props.frame);
  }

  async render() {
    const { open, speed, title, clsFrame, clsFrameHeading, clsFrameContent } = this.data;
    const transition = `height ${speed}ms cubic-bezier(.4, 0, .2, 1)`;

    return await (
      <div className={'frame ' + (open ? 'active' : '') + ' ' + clsFrame}>
        <div className={'heading ' + clsFrameHeading} onClick={this.onHeadingClick}>{title}</div>
        <ui-collapse isOpen={open} transition={transition}>
          <div className={'content ' + clsFrameContent}>
            {this.children}
          </div>
        </ui-collapse>
      </div>
    );
  }
}

interface AccordionFrameProps {
  frame: null;
  open: false;
  speed: 300;
  title: '',
  clsFrame: '',
  clsFrameHeading: '',
  clsFrameContent: ''
}

@CustomElement('ui-accordion')
@Properties<AccordionProps>({
  marker: true,
  variant: 1,
  oneFrame: true,
  oneFrameOpen: true,
  animationDuration: 300,

  clsAccordion: '',
  clsFrame: '',
  clsFrameHeading: '',
  clsFrameContent: '',

})
@Events([
  'FrameOpen',
  'FrameBeforeOpen',
  'FrameClose',
  'FrameBeforeClose'
])
export class Accordion extends BaseComponent<AccordionProps> {
  constructor() {
    super();

    const openFrames = {};

    Array.from(this.children).forEach((child, index) => {
      if (child.getAttribute('open')) {
        openFrames[index] = true;
      }
    });

    this.state = {
      single: this.props.oneFrame,
      openFrames: openFrames
    };

    this.clickFrameHeading = this.clickFrameHeading.bind(this);
  }

  clickFrameHeading(index) {
    const { openFrames } = this.state;
    const isOpen = !!openFrames[index];
    const allowMultipleOpen = this.props.oneFrame === false;
    const { oneFrameOpen } = this.props;
    const frame = React.Children.toArray(this.props.children)[index];

    if (!isOpen && !this.props.onFrameBeforeOpen(frame, index)) { return; }
    if (isOpen && !this.props.onFrameBeforeClose(frame, index)) { return; }

    if (allowMultipleOpen) {
      this.setState({
        openFrames: {
          ...openFrames,
          [index]: !isOpen
        }
      });
    } else {
      if (oneFrameOpen && isOpen) { return; }
      this.setState({
        openFrames: {
          [index]: !isOpen
        }
      });
    }

    this.props[isOpen ? 'onFrameOpen' : 'onFrameClose'](frame, index);
  }

  async render() {
    const { variant, marker, clsAccordion, clsFrame, clsFrameHeading, clsFrameContent, animationDuration } = this.props;
    const { openFrames } = this.state;
    const className = `accordion ${variant === 2 ? 'material' : ''} ${marker ? 'marker-on' : ''} ${clsAccordion}`;

    return await (
      <div className={className}>
        {
          Array.from(this.children).map((frame, index) => {
            const props = frame.props;
            const frameProps = {
              animationDuration,
              title: props.title,
              clsFrame: clsFrame + ' ' + props.clsFrame,
              clsFrameHeading: clsFrameHeading + ' ' + props.clsFrameHeading,
              clsFrameContent: clsFrameContent + ' ' + props.clsFrameContent
            };

            return (
              <AccordionFrame key={index}
                {...frameProps}
                open={!!openFrames[index]}
                onHeadingClick={this.clickFrameHeading}
                frame={index}>
                {props.children}
              </AccordionFrame>
            );
          })
        }
      </div>
    );
  }
}

interface AccordionProps {
  marker: boolean;
  variant: number;
  oneFrame: boolean;
  oneFrameOpen: boolean;
  animationDuration: number;

  clsAccordion: string;
  clsFrame: string;
  clsFrameHeading: string;
  clsFrameContent: string;
}
