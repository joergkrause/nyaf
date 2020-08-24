import { LifeCycle, BaseComponent } from '@nyaf/lib';
import { IStore } from '../interfaces/store.interface';
import { Update } from '../interfaces/update.interface';

/**
 * Holds the updates defined for a component and executes the assignment. This class is used
 * internally and shall not be called from user code.
 */
export class UpdatesBinder {
  static _instanceStore = new Map<HTMLElement, UpdatesBinder>();

  public static initialize<T extends object>(component: BaseComponent): UpdatesBinder {
    const mbInstance = new UpdatesBinder();
    UpdatesBinder._instanceStore.set(component, mbInstance);
    const isShadowed = !!component.constructor['withShadow'];
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as BaseComponent).__uniqueId__) {
        // this is the single binder
        const elements = isShadowed ? component.shadowRoot : component;
        const updatesMap: Update<T>[] = component['__updates__'];
        if (updatesMap && updatesMap.length > 0) {
          updatesMap.forEach(update => {
            const queries = elements.querySelectorAll<HTMLElement>(update.selector);
            if (!queries) {
              throw new Error('Invalid updates selector, element not found using: ' + update.selector);
            }
            // we assume that the component implements IStore<T>
            if (!component['store']) {
              throw new Error('An updatable component must implement a store using the IStore interface');
            }
            (component as unknown as IStore<T>).store.subscribe(update.store, (result) => {
              // the change in store occured and we write the result to all corresponding targets
              queries.forEach(targetElement => targetElement[update.target] = result);
            });
          });
        }
      }
    });
    return mbInstance;
  }

  /**
   * Returns the Updates Binder for a component. Each component has it's very own binder instance.
   * @param component The component this instance is assigned to
   */
  public static getInstance(component: HTMLElement) {
    return UpdatesBinder._instanceStore.get(component);
  }

}
