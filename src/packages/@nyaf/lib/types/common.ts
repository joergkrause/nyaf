import { IBaseComponent } from '../components/base.component';
import { Expander } from '../code/expander/expander';
import { IExpander } from '../code/expander/iexpander';

/** @internal */
export type ComponentType<T extends HTMLElement | HTMLParagraphElement> = new (...args: any[]) => T;

/** @internal */
export interface Component extends ComponentType<IBaseComponent> {
  readonly selector?: string;
  readonly customEvents?: string[];
}

/** @internal */
export type ExpandersType<T extends IExpander> = new () => T;

/** @internal */
export interface ExpanderInstance extends ExpandersType<Expander> {
  readonly expandAttr?: string;
}
