import { IBaseComponent } from '../components/base.component';
import { Expander } from '../lib/expander/expander';
import { IExpander } from '../lib/expander/iexpander';

export type ComponentType<T extends HTMLElement | HTMLParagraphElement> = new (...args: any[]) => T;

export interface Component extends ComponentType<IBaseComponent> {
  readonly selector?: string;
  readonly customEvents?: string[];
}

export type ExpandersType<T extends IExpander> = new () => T;

export interface ExpanderInstance extends ExpandersType<Expander> {
  readonly expandAttr?: string;
}
