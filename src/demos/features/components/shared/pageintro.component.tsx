import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';


interface PageIntroProps {
  header: string;
  small: string;
}

@CustomElement('app-page-intro')
@Properties<PageIntroProps>({ header: '', small: ''})
export class PageIntroComponent extends BaseComponent<PageIntroProps> {
  constructor() {
    super();
  }

  async render() {
    return await (
      <div class='row main-row-adjust' >
      <div class='col-10'>
          <div class='display-3 head-adjust' >{this.data.header}
            <small class='small-adjust'>{this.data.small}</small></div>
      </div>
      <div class='col-2'></div>
    </div>
    );
  }
}
