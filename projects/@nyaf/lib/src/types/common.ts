import { BaseComponent } from "../components/base.component";

export interface ServiceType<T> extends Function {
  new (...args: any[]): T;
}

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface ComponentType<T extends HTMLElement> extends Function {
  new (...args: any[]): T;
}

export interface Component extends ComponentType<BaseComponent> {
  readonly selector?: string;  
}
