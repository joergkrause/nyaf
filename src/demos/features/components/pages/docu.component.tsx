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
      <div style='position: relative; top: 150px; margin-bottom: 150px;' class='container'>
        <style>
          {`nav {
              background-color: black !important;
            }
            footer {
              position: fixed;
              width: 100%;
              bottom: 0;
            }
            `}
        </style>
        {this.data.content}
        <div style='height:150px'></div>
      </div>
    );
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      this.loadDocu();
    }
  }

}
