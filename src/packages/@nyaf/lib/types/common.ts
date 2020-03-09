import { IBaseComponent } from '../components/base.component';

export interface ServiceType<T> {
  new(...args: any[]): T;
  instance: T;
}

export type Type<T> = new (...args: any[]) => T;

export type ComponentType<T extends HTMLElement | HTMLParagraphElement> = new (...args: any[]) => T;

export interface Component extends ComponentType<IBaseComponent> {
  readonly selector?: string;
  readonly services: any;
  readonly customEvents?: string[];
}
