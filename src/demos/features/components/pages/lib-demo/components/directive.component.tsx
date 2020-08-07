import JSX, { CustomElement, BaseComponent, Directive, BaseDirective, ShadowDOM } from '@nyaf/lib';

import './directive.component.scss';

/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-directive')
@ShadowDOM()
export class DirectiveComponent extends BaseComponent<any> {

  async render() {
    return await (
      <>
        <button type='button' directive='drag' part='drag-button'>
          Drag me around
        </button>
        <div directive='drop' part='drop-zone'>

        </div>
      </>
    );
  }


}


@Directive('[directive="drop"]')
export class DropTargetDirective extends BaseDirective {

  constructor(public host: HTMLElement) {
    super(host);
  }

  setup() {
    this.host.addEventListener('drop', (e: DragEvent) => {
      if (e.dataTransfer.getData('text') !== 'from button') {
        e.preventDefault();
      }
    });
  }

}


@Directive('[directive="drag"]')
export class DragDirective extends BaseDirective {

  constructor(public host: HTMLElement) {
    super(host);
    this.host.draggable = true;
  }

  setup() {
    this.host.addEventListener('dragstart', (e: DragEvent) => {
      e.dataTransfer.setData('text', 'from button');
    });
    this.host.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
    });
  }

}
