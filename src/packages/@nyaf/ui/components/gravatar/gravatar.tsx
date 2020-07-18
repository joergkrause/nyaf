import JSX, { BaseComponent, CustomElement, Properties } from '@nyaf/lib';

import { MD5 } from '../../routines';

@CustomElement('ui-gravatar')
@Properties<GravatarProps>({
  size: 80,
  defaultImage: 'mp',
  cls: '',
  className: '',
  email: ''
})
export class Gravatar extends BaseComponent<GravatarProps> {
  async render() {
    const { size, defaultImage, email, cls, className, ...props } = this.data;
    const src = `//www.gravatar.com/avatar/${MD5((email.toLowerCase()).trim())}?size=${size}&d=${defaultImage}`;

    return (
      <img src={src} className={`gravatar ${cls} ${className}`} {...props} />
    );
  }
}

interface GravatarProps {
  size?: number;
  defaultImage?: string;
  cls?: string;
  className?: string;
  email: string;
}
