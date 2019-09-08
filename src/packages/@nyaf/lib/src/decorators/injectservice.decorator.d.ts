import { ServiceType } from '../types/common';
export declare function InjectService<T>(name: string, type: ServiceType<T>): (target: any) => void;
