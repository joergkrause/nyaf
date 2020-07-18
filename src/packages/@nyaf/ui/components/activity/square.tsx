import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('ui-activity-square')
export class ActivitySquare extends BaseComponent<{}> {
  constructor() {
    super();
  }

  createItems() {
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push(
        <div className='square' key={i} />
      );
    }
    return items;
  }

  async render() {
    return (<>{this.createItems()}</>);
  }
}
