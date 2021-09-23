import { Properties } from '../../decorators/properties.decorator';
import { BaseComponent } from '../base.component';
import { LifeCycle } from '../lifecycle.enum';
import { uuidv4 } from '../../code/utils';
import { Events } from '../../decorators';

/**
 * This component allows to create an outlet, that has no vivible DOM node.
 * A comment node is being replaced by the actual node delivered from router.
 * That's an option onw might need in case of weak CSS that changes its behavior if a DIV element or other regular HTML element appears.
 *
 * In the render method add the element as a regular component.
 *
 * This component fires an event, `mutation`, that indicates the content has been changed by the router infrastructure.
 *
 * `<n-outlet></n-outlet>`
 *
 * As with any other outlet you can add a name by using the *name* parameter. That is an observed attribute.
 *
 * `<n-outlet name="target"></n-outlet>`
 *
 * @event mutation Custom event that has a {@link MutationRecord} in the detail property.
 *
 */
@Properties<{ name?: string }>({ name: '' })
@Events(['mutation'])
export class NOutletComponent extends BaseComponent<{ name: '' }> {

  constructor() {
    super();
  }

  private observer!: MutationObserver;
  private outletId: string;

  render() {
    this.outletId = uuidv4();
    return `<!--OUTLET n-router-outlet=${this.data.name} id=${this.outletId} -->`;
  }

  lifeCycle(state: LifeCycle) {
    if (state === LifeCycle.Load) {
      const tw = document.createTreeWalker(this, NodeFilter.SHOW_COMMENT, null);
      let watchTarget: Comment = null;
      while (watchTarget = tw.nextNode() as Comment) {
        if (watchTarget.data.indexOf('OUTLET') === 0) {
          const targetContainer = watchTarget.parentElement;
          this.observer = new MutationObserver((mutations) => {
            // a router has added an element and removed the comment
            mutations.forEach((mutation) => {
              if (mutation.target === this) {
                this.dispatch('mutation', {
                  bubbles: true,
                  cancelable: false,
                  detail: mutation
                });
              }
            });
            // let's conserve this information and re-add
          });
          this.observer.observe(targetContainer, {
            attributes: false,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }
    }
    if (state === LifeCycle.Disconnect && this.observer) {
      this.observer.disconnect();
    }
  }

}
