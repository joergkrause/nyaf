import JSX, { CustomElement, BaseComponent, Properties } from '@nyaf/lib';

@CustomElement('demo-article')
@Properties({ cls: '', className: '' })
export class Article extends BaseComponent<{ cls: string, className: string }> {

  constructor() {
    super();
  }
  async render() {
    return await (
      <article className={`${this.data.cls} ${this.data.className}`}>
        {this.innerHTML}
      </article>
    );
  }

}
