import { LifeCycle, BaseComponent } from '@nyaf/lib';
import { IStore } from '../interfaces/store.interface';
import { Update } from '../interfaces/update.interface';
import { UpdateProperty } from '../interfaces/updateproperty.interface';
import { Updates_Symbol } from '../consts/decorator.props';

/**
 * Holds the updates defined for a component and executes the assignment. This class is used
 * internally and shall not be called from user code.
 */
export class UpdatesBinder {
  static _instanceStore = new Map<HTMLElement, UpdatesBinder>();

  public static initialize<T extends object>(component: BaseComponent): UpdatesBinder {
    const mbInstance = new UpdatesBinder();
    UpdatesBinder._instanceStore.set(component, mbInstance);
    const isShadowed = !!component.constructor[Symbol.for('withShadow')];
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as any).__uniqueId__) {
        mbInstance.lifeCycleHandler.call(mbInstance, component, isShadowed);
      }

    });
    return mbInstance;
  }

  private lifeCycleHandler<T extends object>(component: BaseComponent, isShadowed: boolean): void {
    // this is the single binder
    const elements = isShadowed ? component.shadowRoot : component;
    const updatesMap: Array<Update<T> | UpdateProperty<T, any>> = component[Updates_Symbol];
    if (!updatesMap || updatesMap.length === 0) {
      return;
    }
    // we assume that the component implements IStore<T>
    const store = (component as unknown as IStore<any>).store;
    if (!store) {
      throw new Error('The component must provide a store to use this updates configuration.');
    }
    updatesMap.forEach((update: Update<T> & UpdateProperty<T, any>) => {
      if (update.selector) {
        // this block is for direct binding to elements
        const queries = elements.querySelectorAll<HTMLElement>(update.selector);
        if (!queries) {
          throw new Error('Invalid updates selector, element not found using: ' + update.selector);
        }
        (component as unknown as IStore<T>).store.subscribe(update.store, (result) => {
          // the change in store occured and we write the result to all corresponding targets
          queries.forEach(targetElement => targetElement[update.target] = result[update.store]);
        });
      }
      if (update.property) {
        // this block is for binding to observed attributes
        store.subscribe(update.store, (result) => {
          // the change in store occured and we write the result to all corresponding targets
          component.setData(update.property as never, result[update.store]);
        });
      }
    });
  }

  /**
   * Returns the Updates Binder for a component. Each component has it's very own binder instance.
   * @param component The component this instance is assigned to
   */
  public static getInstance(component: HTMLElement) {
    return UpdatesBinder._instanceStore.get(component);
  }

}
