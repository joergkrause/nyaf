import JSX from '@nyaf/lib'

export default class ActivityMetro extends BaseComponent<{}> {
    constructor(props) {
        super(props);
        this.createItems = this.createItems.bind(this);
    }

    createItems() {
        let items = [];
        for(let i = 0; i < 5; i++)
            items.push(
                <div className="circle" key={i} />
            );
        return items;
    };

    async render() {
        return this.createItems();
    }
}