import JSX, { BaseComponent, Properties } from '@nyaf/lib';

export interface ContainerProps {
  isFluid?: boolean;
}

/**
 * Use this as base class for model driven forms.
 */
@Properties<ContainerProps>({ isFluid: false})
export abstract class ContainerComponent extends BaseComponent<ContainerProps> {

  constructor() {
    super();
  }

  render() {
    const containerClass = !this.data.isFluid ? 'container' : 'container-fluid';
    return (
      <div class={containerClass}>
        {this.parentElement.innerHTML}
      </div>
    );
  }

}