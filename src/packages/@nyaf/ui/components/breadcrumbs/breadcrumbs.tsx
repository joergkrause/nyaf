import JSX, { CustomElement, BaseComponent, Properties } from '@nyaf/lib';
require('./breadcrumbs.css');

@CustomElement('ui-breadcrumbitem')
@Properties<BreadcrumbsItemProps>({
  cls: '',
  className: '',
  clsItem: '',
  clsLink: ''
})
export class BreadcrumbItem extends BaseComponent<BreadcrumbsItemProps> {

  constructor() {
    super();
  }

  async render() {
    const {
      clsItem, clsLink, cls, className, ...rest
    } = this.data;

    const classItem = `page-item ${cls} ${className} ${clsItem}`;
    const classLink = `page-link ${clsLink}`;

    return await (
      <li className={classItem}>
        <a className={classLink} {...rest}>
          {this.children}
        </a>
      </li>
    );
  }
}

interface BreadcrumbsItemProps {
  cls: string;
  className: string;
  clsItem: string;
  clsLink: string;
}

@CustomElement('ui-breadcrumb')
@Properties<BreadcrumbsProps>({
  cls: '',
  className: '',
  clsItem: '',
  clsLink: ''
})
export class Breadcrumbs extends BaseComponent<BreadcrumbsProps> {

  constructor() {
    super();
  }

  async render() {
    const {
      cls, className, clsItem, clsLink
    } = this.data;

    return await (
      <ul className={`breadcrumbs ${cls} ${className}`}>
        {
          this.children.map(item, index) => {
            const props = item.props;
            const classItem = `page-item ${clsItem} ${this.data.clsItem}`;
            const classLink = `page-link ${clsLink} ${this.data.clsLink}`;
            const itemProps = {
              ...props,
              clsItem: classItem,
              clsLink: classLink
            };
            return (
              <ui-breadcrumbitem {...itemProps} key={index}>
                {props.children}
              </ui-breadcrumbitem>
            );
          })
        }
      </ul>
    );
  }
}

interface BreadcrumbsProps {
  cls: string;
  className: string;
  clsItem: string;
  clsLink: string;
}
