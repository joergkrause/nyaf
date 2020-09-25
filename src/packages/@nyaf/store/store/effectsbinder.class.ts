import { LifeCycle, BaseComponent } from '@nyaf/lib';
import { Effect } from '../interfaces/effect.interface';
import { IStore } from '../interfaces/store.interface';
import { Effects_Symbol } from '../consts/decorator.props';
import { ActionKey } from './store.params';
import { Store } from './store';

/**
 * Holds the effects defined for a component and executes the assignment. This class is used
 * internally and shall not be called from user code.
 */
export class EffectsBinder {
  private static _instanceStore = new Map<HTMLElement, EffectsBinder>();

  public static initialize(component: BaseComponent): EffectsBinder {
    const mbInstance = new EffectsBinder();
    EffectsBinder._instanceStore.set(component, mbInstance);
    const isShadowed = !!component.constructor[Symbol.for('withShadow')];
    component.addEventListener('lifecycle', async (e: CustomEvent) => {
      // prevent other components in the render body from bubbling their lifeCycle
      // state to their parent. That happens if the binder binds to both, the parent and the children.
      if (e.detail === LifeCycle.Load && component.__uniqueId__ === (e.target as any).__uniqueId__) {
        mbInstance.lifeCycleHandler.call(mbInstance, component, isShadowed);
      }
    });
    return mbInstance;
  }

  private lifeCycleHandler(component: BaseComponent, isShadowed: boolean): void {
    // this is the single binder
    const elements = isShadowed ? component.shadowRoot : component;
    const effectsMap: Effect[] = component[Effects_Symbol];
    if (!effectsMap || effectsMap.length === 0) {
      return;
    }
    const store = (component as unknown as IStore<any>).store;
    if (!store) {
      throw new Error('The component must provide a store to use this effects configuration.');
    }
    effectsMap.forEach(effect => {
      const queries = elements.querySelectorAll<HTMLElement>(effect.selector);
      if (!queries) {
        throw new Error('Invalid effects selector, element not found using: ' + effect.selector);
      }
      queries.forEach(query => {
        query.addEventListener(effect.trigger, (evt: Event) => {
          const parameter = effect.parameter ? effect.parameter(evt.target as HTMLElement) : undefined;
          this.storeHandler(store, effect.action, parameter);
        });
      });
    });
  }

  private storeHandler(store: Store<any>, action: ActionKey, parameter: any) {
    store.dispatch(action, parameter);
  }

  /**
   * Returns the Binder for a component. Each component has it's very own binder instance.
   * @param component The component this instance is assigned to
   */
  public static getInstance(component: HTMLElement) {
    return EffectsBinder._instanceStore.get(component);
  }

}
