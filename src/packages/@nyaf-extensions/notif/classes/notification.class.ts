export class Notification<T extends any = any> {
  priority = 0;
  lifetime = 0;
  type: string;
  correlation = '';
  action: 'none' | 'remove' | 'duplicate' | 'persist' = 'none';
  data?: T = <T>{};
}
