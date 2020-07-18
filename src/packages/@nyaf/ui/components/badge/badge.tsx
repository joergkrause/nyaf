import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';
require('./badges.scss');

@CustomElement('ui-badge')
@Properties<BadgeProps>({
  inside: false,
  inline: false,
  value: false,
  cls: '',
  className: ''
})
export class Badge extends BaseComponent<BadgeProps> {

  constructor() {
    super();
  }

  async render() {
    const { value, inside, inline, cls, className } = this.data;
    const classBadge = `badge ${inline ? 'inline' : ''} ${inside ? 'inside' : ''} ${cls} ${className}`;

    return await (
      <span className={classBadge}>
        {value !== false && (
          <span>{value}</span>
        )}
        {this.children}
      </span>
    )
  }
}

interface BadgeProps {
  inside: boolean;
  inline: boolean;
  value: boolean;
  cls: string;
  className: string;
}
