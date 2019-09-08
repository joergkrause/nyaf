/**
 * Holds the state of the view model within a component.
 */
export class ModelState<T extends {}> {
  isValid: boolean;
  isPresent: boolean;
  errors: { [key: string]: string };
  model: T;
}
