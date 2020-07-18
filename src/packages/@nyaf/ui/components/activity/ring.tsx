import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('ui-activity-ring')
export class ActivityRing extends BaseComponent<{}> {

  constructor() {
    super();
  }

  createItems() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(
        <div className='wrap' key={i}>
          <div className='circle' />
        </div>
      );
    }
    return items;
  }

  async render() {
    return (<>{this.createItems()}</>);
  }
}
