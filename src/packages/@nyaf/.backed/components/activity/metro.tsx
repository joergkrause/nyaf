import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('ui-activity-metro')
export class ActivityMetro extends BaseComponent<{}> {
    constructor() {
        super();
    }

    createItems() {
        const items = [];
        for (let i = 0; i < 5; i++) {
            items.push(
                <div className='circle' key={i} />
            );
        }
        return items;
    }

    async render() {
      return (<>{ this.createItems() }</>);
    }
}
