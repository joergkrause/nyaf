import { Notif } from '../classes/notif.class';

export interface INotif<T extends object> {
  notifications: Notif<T>;
}
