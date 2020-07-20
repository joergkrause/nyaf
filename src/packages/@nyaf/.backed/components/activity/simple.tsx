import JSX, { CustomElement, BaseComponent, Properties } from '@nyaf/lib';

@CustomElement('ui-activity-simple')
@Properties<ActivitySimpleProps>({
  size: 20,
  radius: 2
})
export class ActivitySimple extends BaseComponent<ActivitySimpleProps> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <svg className='circular'>
        <circle className='path' cx={this.data.size / 2} cy={this.data.size / 2} r={this.data.radius} fill='none' strokeWidth='2' strokeMiterlimit='10' />
      </svg>
    );
  }
}


interface ActivitySimpleProps {
  size: number;
  radius: number;
}
