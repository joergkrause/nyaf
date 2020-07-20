import JSX, { BaseComponent, Properties, CustomElement } from '@nyaf/lib';
require('./container.scss');

@CustomElement('ui-container')
@Properties<ContainerProps>({
  as: 'div',
  fluid: false,
  cls: '',
  className: ''
})
export class Container extends BaseComponent<ContainerProps> {

  constructor() {
    super();
  }

  async render() {
    const { as: Element, fluid, cls, className, ...rest } = this.data;
    return await JSX.createElement(Element, { className: `container${fluid ? '-fluid' : ''} ${cls} ${className}`}, this.innerHTML);
  }
}

interface ContainerProps {
  as: 'div';
  fluid: boolean;
  cls: string;
  className: string;
}
