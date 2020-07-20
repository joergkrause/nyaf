import JSX, { CustomElement, BaseComponent } from '@nyaf/lib';

import '../css/guide.scss';

@CustomElement('demo-guide')
export class Guide extends BaseComponent<{}> {

  constructor() {
    super();
  }

  async render() {

    return await (
        <ui-row>
          <ui-cell cls={'cell-md-8 cell-lg-9 order-2 order-md-1'}>
            <demo-article n-router-outlet='guide'>
            </demo-article>
          </ui-cell>
          <ui-cell cls={'cell-md-4 cell-lg-3 order-1 order-md-2'} id={'side-nav'}>
            <ui-sidemenu isMobile={false} />
          </ui-cell>
        </ui-row>
    );
  }
}
