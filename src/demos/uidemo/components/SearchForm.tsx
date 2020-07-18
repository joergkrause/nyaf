import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

@CustomElement('demo-searchform')
export class SearchForm extends BaseComponent<{}> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div className={'pl-4 pr-4 pt-2'}>
        <ui-input search={true} />
      </div>
    );
  }
}
