import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

@CustomElement('ui-icon')
@Properties<IconProps>(
  {
    prefix: 'mif-',
    name: '',
    size: false,
    cls: '',
    className: ''
  }
)
export class Icon extends BaseComponent<IconProps> {

  constructor() {
    super();
  }

  async render() {
    const {
      prefix,
      name,
      size,
      cls,
      className
    } = this.data;
    return await (
      <span className={`${prefix + name} ${size ? prefix + size : ''} ${cls} ${className}`} />
    );
  }
}

interface IconProps {
  prefix?: string;
  name: string;
  size?: boolean;
  cls?: string;
  className?: string;
}
