import JSX from '../jsx';
import { Properties } from '../../decorators/properties.decorator';
import { BaseComponent } from '../base.component';
import { LifeCycle } from '../lifecycle.enum';

@Properties<{ name?: string }>({ name: '' })
export class NOutletComponent extends BaseComponent<{ name: '' }> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div n-router-outlet={this.data.name}></div>
    );
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      // this.removeChild(this.querySelector('div'))
    }
  }

}
