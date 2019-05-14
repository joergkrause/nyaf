import { Action } from './action';
import { Observer } from 'nyaf';
export declare class Store {
    persist: boolean;
    observer: Observer;
    constructor();
    update(action: Action): void;
    subscribe(type: string): Promise<any>;
}
