import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('demo-support')
export class Support extends BaseComponent<{}> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div className={'container'}>
        Support Information...
      </div>
    )
  }
}
