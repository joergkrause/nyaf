import JSX from '@nyaf/lib'

export default class ActivityRing extends BaseComponent<{}> {
    constructor(props) {
        super(props);
        this.createItems = this.createItems.bind(this);
    }

    createItems(){
        let items = [];
        for(let i = 0; i < 5; i++)
            items.push(
                <div className="wrap" key={i}>
                    <div className="circle" />
                </div>
            );
        return items;
    };

    async render() {
        return this.createItems();
    }
}