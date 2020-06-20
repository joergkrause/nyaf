import { BaseComponent, ComponentData } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


@CustomElement('app-docu')
export class DocuComponent extends BaseComponent<{ content: string }> {
  constructor() {
    super();
    this.loadDocu();
  }

  loadDocu(): void {
    fetch('./docu.html')
    .then(data => data.text())
    .then(data => super.setData('content', data));
  }

  render() {
    return (
      <>
        {super.data.content}
      </>
    );
  }
}
