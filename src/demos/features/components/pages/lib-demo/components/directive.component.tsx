import JSX, { CustomElement, BaseComponent, Directive, BaseDirective, ShadowDOM, UseParentStyles } from '@nyaf/lib';

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
        <button type='button' directive='drag' part='drag-button'>
          I don't want
        </button>
        <div directive='drop' part='drop-zone' >

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
    console.log('dir setup');
    this.host.addEventListener('dragover', (e: DragEvent) => {
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault(); // default is "no drop", so we need to prevent this
    });
    this.host.addEventListener('dragenter', (e: DragEvent) => {
      const bg = this.host.style.backgroundColor;
      this.host.style.backgroundColor = 'red';
      setTimeout(() => {
        this.host.style.backgroundColor = bg;
      }, 50);
    });
    this.host.addEventListener('drop', (e: DragEvent) => {
      e.stopPropagation();
      if (e.dataTransfer.getData('text/plain') !== 'Drag me around') {
        this.host.innerHTML = 'Oops';
      } else {
        this.host.innerHTML = 'Received: ' + e.dataTransfer.getData('text/plain');
      }
      return false;
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
      e.dataTransfer.setData('text/plain', this.host.innerText);
      e.dataTransfer.effectAllowed = 'move';
      this.host.style.opacity = '0.4';
    });
    this.host.addEventListener('dragend', (e: DragEvent) => {
      this.host.style.opacity = '1';
    });
  }

}
