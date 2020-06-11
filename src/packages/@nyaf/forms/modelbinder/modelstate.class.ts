
export interface ErrorState {
  validator: string;
  error: string;
  isValid: boolean;
}

export interface FieldState {
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
}

/**
 * In a form with validators this object returns the fields' states.
 */
export class ModelState<VM> {

  /**
   * The summary of all states
   */
  isValid: boolean;

  /**
   * The list of errors, each field with all states.
   */
  errors: Record<keyof VM, ErrorState[]>;

  state: Record<keyof VM, FieldState>;

}

