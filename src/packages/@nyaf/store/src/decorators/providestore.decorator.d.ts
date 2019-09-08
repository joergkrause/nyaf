import { Store } from '../store/store';
export declare function ProvideStore<T>(storeType: Store<T>): (target: any) => void;
