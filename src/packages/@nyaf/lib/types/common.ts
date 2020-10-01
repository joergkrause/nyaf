import { BaseComponent } from '../components/base.component';
import { Expander } from '../code/expander/expander';
import { IExpander } from '../code/expander/iexpander';
import { BaseDirective } from '../code/basedirective';
import { Events_Symbol_Eventlist, CustomElement_Symbol_Selector } from '../consts/decorator.props';

/** @internal */
export type ComponentType<T extends HTMLElement | HTMLParagraphElement> = new (...args: any[]) => T;

export type DirectiveType<T extends BaseDirective> = new (...args: any[]) => T;

/** @internal */
export interface IComponent extends ComponentType<BaseComponent> {
  readonly [CustomElement_Symbol_Selector]?: string;
  readonly [Events_Symbol_Eventlist]?: string[];
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
