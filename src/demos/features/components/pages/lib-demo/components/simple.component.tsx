import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';

interface SimpleProps {
  text: string;
}

@CustomElement('app-simple')
@Properties<SimpleProps>({ text: 'I am a default' })
export class SimpleComponent extends BaseComponent<SimpleProps> {

  constructor() {
    super();
  }

  async render() {
    return await (
      <div class='alert alert-success'>
        {this.data.text}
      </div>
    );
  }

  public reset() {
    this.data.text = '';
  }

}
