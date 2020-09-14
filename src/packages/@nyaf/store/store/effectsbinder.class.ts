import { LifeCycle, BaseComponent } from '@nyaf/lib';
import { Effect } from '../interfaces/effect.interface';
import { IStore } from '../interfaces/store.interface';

/**
 * Holds the effects defined for a component and executes the assignment. This class is used
 * internally and shall not be called from user code.
 */
export class EffectsBinder {
  static _instanceStore = new Map<HTMLElement, EffectsBinder>();

  public static initialize(component: BaseComponent): EffectsBinder {
    const mbInstance = new EffectsBinder();
    EffectsBinder._instanceStore.set(component, mbInstance);
    const isShadowed = !!component.constructor[Symbol.for('withShadow')];
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle state to their parent
      // that happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as BaseComponent).__uniqueId__) {
        // this is the single binder
        const elements = isShadowed ? component.shadowRoot : component;
        const effectsMap: Effect[] = component['__effects__'];
        if (effectsMap && effectsMap.length > 0) {
          effectsMap.forEach(effect => {
            const queries = elements.querySelectorAll<HTMLElement>(effect.selector);
            if (!queries) {
              throw new Error('Invalid effects selector, element not found using: ' + effect.selector);
            }
            queries.forEach(query => {
              query.addEventListener(effect.trigger, (evt: Event) => {
                const store = (component as unknown as IStore<any>).store;
                if (!store) {
                  throw new Error('The component must provide a store to use this effects configuration.');
                }
                // dispatch the action with the parameters calculated
                store.dispatch(effect.action, effect.parameter(evt));
              });
            });
          });
        }
      }
    });
    return mbInstance;
  }

  /**
   * Returns the Binder for a component. Each component has it's very own binder instance.
   * @param component The component this instance is assigned to
   */
  public static getInstance(component: HTMLElement) {
    return EffectsBinder._instanceStore.get(component);
  }

}
