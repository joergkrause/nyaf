import JSX, { CustomElement, BaseComponent, Properties } from '@nyaf/lib';

@CustomElement('demo-example')
@Properties({ cls: '', className: ''})
export class Example extends BaseComponent<{ cls: string, className: string }> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div className={`example ${this.data.cls} ${this.data.className}`} {...rest}>
        {this.children}
      </div>
    );
  }

}
