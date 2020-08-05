import { IDirective } from '../types/common';

export interface IBaseDirective {
  setup: () => void;
  host: HTMLElement;
}

export class BaseDirective implements IBaseDirective {
  constructor(public host: HTMLElement) {
    this.setup();
  }
  setup(): void {
  }
}

