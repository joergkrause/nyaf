import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('ui-activity-cycle')
export class ActivityCycle extends BaseComponent<{}> {

  constructor() {
    super();
  }

    async render() {
        return await (<div className='cycle' key={1} />);
    }
}