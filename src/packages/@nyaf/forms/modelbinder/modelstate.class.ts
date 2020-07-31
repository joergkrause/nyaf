import { Email, Required, MaxLength, MinLength, Pattern } from '@nyaf/forms';
import { Type } from '@nyaf/lib';

export interface ErrorState {
  // TODO: siehe SVOGV deco pattern
  type?: Record<any, boolean>;
  error?: Record<any, string>;
  // any of the validators failed
  isValid: Record<any, boolean>;
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
  validators: Record<keyof VM, ErrorState>;

  /**
   * Set of states
   */
  state: Record<keyof VM, FieldState>;

}

