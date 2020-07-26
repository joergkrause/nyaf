import { BaseComponent, ServiceType, InjectService, Properties } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';

import { CounterService } from '../services/counter.service';

/**
 * Shows how to create a simple interactive component using events and state.
 */
@CustomElement('app-service-counter')
@InjectService(CounterService.Id, CounterService)
@Properties<{ cnt: number }>({ cnt: 0 })
export class ServiceCounterComponent extends BaseComponent<{ cnt: number }> {
  constructor() {
    super();
    this.data.cnt = 0;
  }

  clickMeAdd(v: number) {
    console.log('Counter Service Element Click');
    this.services<CounterService>(CounterService.Id).increment();
    const count = this.services(CounterService.Id).value;
    this.data.cnt = count;
  }

  clickMeSub(v: number) {
    console.log('Counter Element Click');
    this.services<CounterService>(CounterService.Id).decrement();
    const count = this.services(CounterService.Id).value;
    this.data.cnt = count;
  }

  async render() {
    return await (
      <>
        <div>
          <button type='button' class='btn btn-success' n-on-Click={e => this.clickMeAdd(e)}>
            Add 1
          </button>
          <button type='button' class='btn btn-warning' n-on-Click={e => this.clickMeSub(e)} n-async>
            Sub 1
          </button>
        </div>
        <pre style='border: 1px solid gray;'>{this.data.cnt}</pre>
      </>
    );
  }
}
