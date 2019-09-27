import { ServiceType } from '../types/common';

export function InjectService<T>(name: string, type: ServiceType<T>) {
  return function(target: any) {
    // closure to create a singleton
    const t = {};
    t[name] = new type();
    Object.defineProperty(target, 'service', {
      get: function() {
        return t;
      }
    });
  };
}
