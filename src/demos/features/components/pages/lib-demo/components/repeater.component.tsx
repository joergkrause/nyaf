import JSX, { CustomElement, BaseComponent, of, from, select } from '@nyaf/lib';

interface TBind {
  id: number;
  name: string;
}

/**
 * Simple event handling.
 */
@CustomElement('app-repeater-test')
export class RepeaterTestComponent extends BaseComponent<TBind[]> {

  private eventData: Array<TBind>;

  constructor() {
    super();
    this.eventData = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }, { id: 3, name: 'Three' }];
  }

  clickMe(e?: Event) {
    console.log('Button Element Click ');
    this.eventData.push({ id: 4, name: 'Four' });
    this.setup();
  }

  async render() {

    return await (
      <>
        <div>
          <h4>Repeater Component n-repeat</h4>
          <ul>
            <n-repeat source={this.eventData}>
              <li data={of<TBind>(p => p.id)}>{of<TBind>(p => p.name)}</li>
            </n-repeat>
          </ul>
          <h4>Repeater Function n-repeat="from"</h4>
          <ul>
              <li n-repeat={from<TBind>(this.eventData)} data={select<TBind>(p => p.id)} >The name is: {select<TBind>(p => p.name)}</li>
          </ul>
        </div>
        <button n-on-click={this.clickMe}>Add Item Short</button>
      </>
    );
  }
}
