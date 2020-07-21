import { BaseComponent, Properties, LifeCycle } from '@nyaf/lib';
import JSX, { CustomElement } from '@nyaf/lib';


@CustomElement('app-docu')
@Properties<{ content: string }>({ content: 'Loading...' })
export class DocuComponent extends BaseComponent<{ content: string }> {
  constructor() {
    super();
  }

  loadDocu(): void {
    // copied into dist folder by deploy script
    fetch('demo/features/readme.html')
    .then(data => data.text())
    .then(data => this.data.content = data);
  }

  render() {
    return (
      <>
        {this.data.content}
      </>
    );
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      this.loadDocu();
    }
  }

}
