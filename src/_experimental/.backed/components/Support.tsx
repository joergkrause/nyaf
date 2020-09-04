import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

export class Support extends BaseComponent<{}> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div className={'container'}>

      </div>
    )
  }
}
