import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

require('./activity.scss');

@CustomElement('ui-activity')
@Properties<ActivityProps>({
  type: 'ring',
  variant: 'light',
  size: 64,
  radius: 20,
  cls: ''
})
export class Activity extends BaseComponent<ActivityProps> {

  constructor() {
    super();
  }

  async render() {
    let activityType;
    let activityClassName;

    const { type, variant, size, radius, cls } = this.data;

    switch (type) {
      case 'metro': activityType = <ui-activity-metro />; break;
      case 'square': activityType = <ui-activity-square />; break;
      case 'cycle': activityType = <ui-activity-cycle />; break;
      case 'simple': activityType = <ui-activity-simple size={size} radius={radius} />; break;
      default: activityType = <ui-activity-ring />;
    }

    activityClassName = `activity-${type} ${variant}-style ${cls}`;

    return await (
      <div className={activityClassName}>
        {activityType}
      </div>
    );
  }
}

interface ActivityProps {
  type: 'ring' | 'metro' | 'square' | 'cycle' | 'simple';
  variant: 'light' | 'dark';
  size: number;
  radius: number;
  cls: string;
}
