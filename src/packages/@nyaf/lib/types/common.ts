import { IBaseComponent, BaseComponent } from '../components/base.component';

export type ComponentType<T extends HTMLElement | HTMLParagraphElement> = new (...args: any[]) => T;

export interface Component extends ComponentType<IBaseComponent> {
  readonly selector?: string;
  readonly customEvents?: string[];
}
