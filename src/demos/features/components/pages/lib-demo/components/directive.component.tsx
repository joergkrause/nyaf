import JSX, { CustomElement, BaseComponent, Directive, BaseDirective, ShadowDOM, UseParentStyles } from '@nyaf/lib';

import './directive.component.scss';

import * as css from './directive.styles.scss';

/**
 * Event handling and used in up-level component.
 */
@CustomElement('app-directive')
@ShadowDOM()
@UseParentStyles(css.cssExports)
export class DirectiveComponent extends BaseComponent<any> {

  async render() {
    return await (
      <>
        <h1 class='directive-aware'>A styled header</h1>
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
