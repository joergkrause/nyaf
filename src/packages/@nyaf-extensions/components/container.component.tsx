import JSX, { BaseComponent, Properties, CustomElement } from '../../@nyaf/lib/index';

export interface ContainerProps {
  classList: string;
}

/**
 * Create a chain of container-divs from classes:
 *
 * <app-container classList="container row cell">Some Content</app-container>
 *
 * This renders in:
 * <div class="container">
 *  <div class="row">
 *    <div class="cell">
 *      Some Content
 *    </div>
 *  </div>
 * </div>
 */
@Properties<ContainerProps>({ classList: ''})
@CustomElement('n-container')
export class ContainerComponent extends BaseComponent<ContainerProps> {

  constructor() {
    super();
  }

  render() {
    const clss = super.data.classList.split(' ');
    const div = (cls: string, inner: any) => {
      if (cls) {
        return inner;
      }
      return (<div class={cls}>{inner}</div>);
    };
    const c = clss.shift();
    return div(c, super.parentElement.innerHTML);
  }

}
