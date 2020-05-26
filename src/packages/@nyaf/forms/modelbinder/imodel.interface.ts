import { ModelBinder } from './modelbinder.class';

export interface IModel<VM extends object> {
  model: ModelBinder<VM>;
}