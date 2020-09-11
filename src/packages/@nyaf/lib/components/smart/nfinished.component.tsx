import JSX from '../jsx';
import { Properties } from '../../decorators/properties.decorator';
import { BaseComponent } from '../base.component';
import { LifeCycle } from '../lifecycle.enum';

/**
 * You want to wait for content children to be rendered, and the content children match these conditions:
 *
 * 1. common HTML elements (not components)
 * 2. Added by dynamic actions, such as the router
 *
 * If both conditions are true, you must re-render the parent element by providing this smart element:
 *
 * @example
 * ~~~
 * <some-component>
 *   <ul>
 *     <li>Dynamically added later</li>
 *   </ul>
 *   <n-finish />
 * </some-component>
 * ~~~
 *
 * The occurrence of the element triggers the parent to re-render. This enforces the appearance of all element in it, regardless their nature.
 *
 */
export class NFinishedComponent extends BaseComponent<any> {

  constructor() {
    super();
  }

  render(): any {
    return null;
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      const { parentElement } = this;
      parentElement.removeChild(this);
      if (parentElement instanceof BaseComponent) {
        parentElement['setup']();
      }
    }
  }

}
