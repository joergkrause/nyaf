import { BaseComponent, ComponentData } from '@nyaf/lib';
import { Store } from '../store/store';

export interface IStore<S extends object> {
  store: Store<S>;
}

