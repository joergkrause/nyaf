import JSX, { CustomElement, BaseComponent, of, from, select } from '@nyaf/lib';
import { ModelBinder } from '@nyaf/forms';

interface TBind {
  id: number;
  name: string;
}

/**
 * Simple event handling.
 */
@CustomElement('app-repeater-test')
export class RepeaterTestComponent extends BaseComponent<{}> {
  eventData: any;

  constructor() {
    super();
  }

  clickMe(e) {
    console.log('Button Element Click ', e);
    this.eventData = e;
    super.setup();
  }

  async render() {
    const data: Array<TBind> = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }, { id: 3, name: 'Three' }];
    return await (
      <>
        <div>
          <h4>Repeater Component n-repeat</h4>
          <ul>
            <n-repeat source={data}>
              <li data={of<TBind>(p => p.id)}>{of<TBind>(p => p.name)}</li>
            </n-repeat>
          </ul>
          <h4>Repeater Function n-repeat="from"</h4>
          <ul>
              <li n-repeat={from<TBind>(data)} data={select<TBind>(p => p.id)} >The name is: {select<TBind>(p => p.name)}</li>
          </ul>
        </div>
      </>
    );
  }
}
