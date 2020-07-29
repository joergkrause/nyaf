import { Expander } from '@nyaf/lib';
import { Expand } from '@nyaf/lib';

@Expand('danger-button')
export class ButtonExpander extends Expander  {
  constructor() {
    super();
  }
  class = 'btn btn-sm btn-danger';
  type = 'button';
}
