import { IBaseComponent } from '../components/base.component';
import { Expander } from '../code/expander/expander';
import { IExpander } from '../code/expander/iexpander';
import { BaseDirective } from '../code/basedirective';

/** @internal */
export type ComponentType<T extends HTMLElement | HTMLParagraphElement> = new (...args: any[]) => T;

export type DirectiveType<T extends BaseDirective> = new (...args: any[]) => T;

/** @internal */
export interface IComponent extends ComponentType<IBaseComponent> {
  readonly selector?: string;
  readonly customEvents?: string[];
}

/** @internal */
export interface IDirective extends DirectiveType<BaseDirective> {
  setup: () => void;
}

/** @internal */
export type ExpandersType<T extends IExpander> = new () => T;

/** @internal */
export interface IExpanderInstance extends ExpandersType<Expander> {
  readonly expandAttr?: string;
}
