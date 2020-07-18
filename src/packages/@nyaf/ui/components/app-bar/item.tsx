import JSX, { CustomElement, Properties, BaseComponent } from '@nyaf/lib';

@CustomElement('ui-appbar-item')
@Properties<AppBarItemProps>({
  name: '',
  isBrand: false,
  as: 'span',
  cls: '',
  className: ''
})
export class AppBarItem extends BaseComponent<AppBarItemProps> {

  constructor() {
    super();
  }

  async render() {
    const { as: Element, cls, className, isBrand, name, ...rest } = this.data;

    return await (
      <Element className={`${isBrand ? 'brand no-hover' : 'app-bar-item'} ${cls} ${className}`} {...rest}>
        {name !== '' ? name : this.children}
      </Element>
    );
  }
}

interface AppBarItemProps {
  as: 'span';
  name: string;
  isBrand: boolean;
  cls: string;
  className: string;
}
