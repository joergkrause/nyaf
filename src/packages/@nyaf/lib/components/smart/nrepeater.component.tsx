import JSX from '../jsx';
import { Properties } from '../../decorators/properties.decorator';
import { BaseComponent } from '../base.component';

@Properties<{ source: [] }>({ source: [] })
export class NRepeaterComponent extends BaseComponent<{ source: [] }> {

  private replace = (s: string, item: any) => s.replace(/@@(.+?)@@/g, (r, p1) => item[p1]);

  constructor() {
    super();
  }

  async render() {
    const loop = this.data.source.map(item => this.replace(this.innerHTML, item));
    return await (
      <>
        {loop}
      </>
    );
  }
}