import JSX, { CustomElement, BaseComponent, of } from '@nyaf/lib';

interface T {
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
    const data: Array<T> = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }, { id: 3, name: 'Three' }]
    return await (
      <>
        <div>
          <ul>
            <n-repeat source={data}>
              <li data={of<T>(p => p.id)}>{of<T>(p => p.name)}</li>
            </n-repeat>
          </ul>
        </div>
      </>
    );
  }
}
