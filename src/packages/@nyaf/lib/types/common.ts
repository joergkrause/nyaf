import { BaseComponent } from '../components/base.component';

export type ServiceType<T> = new (...args: any[]) => T;

export type Type<T> = new (...args: any[]) => T;

export type ComponentType<T extends HTMLElement> = new (...args: any[]) => T;

export interface Component extends ComponentType<BaseComponent<{}>> {
  readonly selector?: string;
  readonly services?: any;
  readonly customEvents?: string[];
}
